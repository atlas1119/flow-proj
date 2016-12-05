
$(function(){

    function getType(dom,id){
        $.get('/gettemplatenodes?id='+id,function(data){
            var html = '';
            for (var i = 0; i < data.nodes.length; i++) {
                if(i == 0){
                    html += '<li class="active" data-id="'+ data.nodes[i]._id +'">'+data.nodes[i].node_name+'</li>'
                } else {
                    html += '<li data-id="'+ data.nodes[i]._id +'">'+data.nodes[i].node_name+'</li>';
                }
            }
            dom.html(html?html:"<div style='margin:10px 0;font-size:12px;'>暂无模板</div>");
            dom.find("li").unbind();
            dom.find("li").bind('click',function(){
                dom.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
    }

    function getNextWorkNode(dialog,id){
        $.get('/getworknodebyid?id='+id,function(data){
            dialog.find(".dialog-title").append("当前工作节点："+data.node.work_name);
        });
    }

    function openStep2(){
        var html_2_step = ['<div class="chain-group-dialog">',
                    '<div class="flow-form-container">',
                        '<div class="flow-form-list">',
                            '<div class="flow-inline rili-inline">',
                                '<label class="login-input-icon-1">日期：</label>',
                                '<input id="datepicker" type="text" placeholder="" class="flow-name input-time" autocomplete="off" readonly>',
                                '<i class="rili-icon"></i>',
                            '</div>',
                            '<div class="flow-inline">',
                                '<label class="login-input-icon-1">公司名称：</label>',
                                '<input type="text" placeholder="" class="flow-name input-name company-input" autocomplete="off">',
                            '</div>',
                            '<div class="flow-inline">',
                                '<label class="login-input-icon-1">成本：</label>',
                                '<input type="text" placeholder="" class="flow-name input-name cost-input" autocomplete="off">',
                            '</div>',
                            '<div class="flow-inline">',
                                '<label class="login-input-icon-1">销售额：</label>',
                                '<input type="text" placeholder="" class="flow-name input-name market-input" autocomplete="off">',
                            '</div>',
                            '<div class="flow-inline">',
                                '<label class="login-input-icon-1">产生利润：</label>',
                                '<input type="text" placeholder="" class="flow-name input-name profit-input" autocomplete="off" readonly>',
                            '</div>',
                            '<div class="btn-container">',
                                '<button class="login-step login-step-1">提交</button>',
                                '<button class="login-step login-step-2">取消</button>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'].join('');
        $.ext_dialog.open({
            title:'添加业务链条信息',
            width: 527,
            haml: html_2_step,
            final: function(){
                var dialog = $(this).parent();
                dialog.addClass("chain-group-dialog");
                dialog.find("#datepicker").datepicker();

                var cost = dialog.find(".cost-input"),
                    market = dialog.find(".market-input"),
                    profit = dialog.find(".profit-input");

                cost.on("input propertychange",function(){
                    if($(this).val() && market.val()){
                        var fit = parseFloat(market.val()) - parseFloat($(this).val());
                        if(fit >= 0){
                            profit.val('盈利'+fit);
                        }else{
                            profit.val('亏本'+fit*(-1));
                        }

                        profit.attr("data-fit",fit);
                    }
                });

                market.on("input propertychange",function(){
                    if($(this).val() && cost.val()){
                        var fit = parseFloat($(this).val()) - parseFloat(cost.val());
                        if(fit >= 0){
                            profit.val('盈利'+fit);
                        }else{
                            profit.val('亏本'+fit*(-1));
                        }

                        profit.attr("data-fit",fit);
                    }
                });

                // 提交
                dialog.find(".login-step-1").click(function(){
                    var postData = {
                        chain_at: dialog.find("#datepicker").val(),
                        company_name: dialog.find(".company-input").val(),
                        flow_id: window.flow_id,
                        cost_value: cost.val(),
                        sales_value: market.val(),
                        profit_value: profit.attr('data-fit')
                    }

                    $.post("/createchain",postData,function(data){
                        if(data.success){
                            window.location.href = "/flow/detail?id="+window.flow_id;
                        }
                    });
                });
                // 取消
                dialog.find(".login-step-1").click(function(){

                });

            }
        });
    }

    $.get("/flow/nodelist?id="+window.flow_id,function(data){
        var nodes = data.nodes;
        for (var i = 0; i < nodes.length; i++) {

            // console.log("###cur",window.user_id,"$$$$",nodes[i].node_reviewer_id.toString() ,window.user_id == nodes[i].node_reviewer_id.toString());
            var jsonS = nodes[i].node_struct;
            var bootData = JSON.parse(jsonS);
            var htmlbtn = ['<div class="detail-btn-list">',
                            // '<button class="detail-btn">查看历史变动</button>',
                            (nodes[i].review_state != 1?'<a class="detail-btn" href="/flow/editnode?id='+nodes[i]._id+'">编辑</a>':''),
                            // '<a class="detail-btn">提交</a>',
                            (window.user_id == nodes[i].node_reviewer_id.toString() && nodes[i].review_state != 1?'<a class="detail-btn verify-person" href="javascript:void(0);" data-index="'+ i +'" data-node-id="'+ nodes[i]._id +'">审核</a>':''),
                        '</div>'].join('');

            $(".detail-node-list").append("<div class='node-content'><h6 class='node-title'><span class='left'>"+nodes[i].node_name+"</span><span class='right'>"+nodes[i].created_at.split("T")[0]+"创建</span></h6><div class='node-item' id='node"+ i +"'></div><div class='node-click' data-index='"+i+"'>点击查看详情<i></i></div>"+htmlbtn+"</div>")
            var fb = new Formbuilder({
                selector: '#node'+i,
                bootstrapData: bootData.fields
            });
            var container = fb.mainView.$responseFields;
            $('#node'+i).html(container.html());
            // fb.mainView.lockLeftWrapper();
            // fb.mainView.$fbLeft.hide();
            // fb.mainView.saveFormButton.hide();
            // $("#formMain").find(".cover").hide();
            // container.parent().css({'margin-left':'0','padding-top':'0','border-left':'none','padding-left':0,'min-height': 'auto'})
            $('#node'+i).find(".actions-wrapper").hide();

        }

        $(".node-click").click(function(){
            var index = $(this).attr("data-index");
            if($(this).attr("data-show") != '1'){
                $('#node'+index).css({'height':'auto'});
                $(this).addClass('show');
                $(this).attr("data-show",'1');
            }else{
                $('#node'+index).css({'height':'140px'});
                $(this).removeClass('show');
                $(this).attr("data-show",'0');
            }

            return false;

        });

        $(".verify-person").click(function(){
            var me = $(this);
            var index = me.attr('data-index');
            var id = me.attr('data-node-id');
            var nodeH = $('#node'+index).html().toString();
            var html = ['<div class="chain-group-dialog" style="max-height:400px;overflow:auto;">',
                            nodeH,
                            '<div class="btn-container">',
                                '<button class="login-step login-step-1">审核通过</button>',
                                '<button class="login-step login-step-2">审核不通过</button>',
                            '</div>',
                        '</div>'].join('');
            $.ext_dialog.open({
                title:'审核信息',
                width: 500,
                haml: html,
                final: function(){
                    var dialog = $(this).parent();
                    dialog.addClass("chain-group-dialog");
                    dialog.find(".login-step-1").click(function(){
                        $.post('/verifyperson',{id:id,state:1}, function(data){
                            if(data.success){
                                $.ext_dialog.open({
                                    title:'',
                                    width: 200,
                                    haml: '<div style="text-align:center;">更新成功</div>',
                                    final: function(){
                                        setTimeout(function(){
                                            window.location.reload(true);
                                        },3000);
                                    }
                                });

                            }
                        });
                    });
                    dialog.find(".login-step-2").click(function(){
                        $.post('/verifyperson',{id:id,state:2}, function(data){
                            if(data.success){
                                $.ext_dialog.open({
                                    title:'',
                                    width: 200,
                                    haml: '<div style="text-align:center;margin-bottom:15px;">更新成功</div>',
                                    final: function(){
                                        setTimeout(function(){
                                            window.location.reload(true);
                                        },3000);
                                    }
                                });
                            }
                        });
                    });
                }
            });

        });

        $("#detailAddNode").click(function(){
            var next_worknode_id = nodes[nodes.length -1].next_worknode_id;

            var html = ['<div class="flow-group-dialog">',
                            '<div class="flow-type-container">',
                                '<h6 class="flow-type-title">选择类型：</h6>',
                                '<ul class="flow-templatetype-list step-2 clearfix">',
                                    '加载中...',
                                '</ul>',
                                '<div class="flow-create-work" style="margin-top:10px;"><i></i><a href="javascript:void(0);" target="_blank" id="createTemp">创建新模板</a></div>',
                            '</div>',
                            '<div style="text-align:center"><button class="login-step-btn step-2">下一步</button><span class="step-error"></span></div>',
                        '</div>'].join('');
            $.ext_dialog.open({
                title:'',
                width: 600,
                haml: html,
                final: function(){
                    var dialog = $(this).parent();
                    dialog.addClass("flow-group-dialog");
                    getType($(".flow-templatetype-list"),next_worknode_id);
                    getNextWorkNode(dialog,next_worknode_id);
                    dialog.find("#createTemp").click(function(){
                        window.location.href = "/model/createtemplate?id="+next_worknode_id;
                    });
                    dialog.find('.login-step-btn').click(function(){
                        window.location.href = "/flow/addnode?id="+window.flow_id + "&tplid="+$(".flow-templatetype-list .active").attr("data-id");
                    });
                }
            });
        });

        $('#detailAddChain').click(function(){
            var html_1_step = ['<div class="chain-group-dialog">',
                            '<div class="chain-type-container">',
                                '<span class="line-1"></span><span class="line-2"></span>',
                            '</div>',
                            '<div class="chain-title">添加相关公司</div>',
                        '</div>'].join('');

            $.ext_dialog.open({
                title:'添加业务链条信息',
                width: 332,
                haml: html_1_step,
                final: function(){
                    var dialog = $(this).parent();
                    dialog.addClass("chain-group-dialog");
                    dialog.find(".chain-type-container").click(function(){
                        openStep2();
                    });
                }
            });

        });

    });



});
