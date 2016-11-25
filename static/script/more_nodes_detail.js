
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

    $.get("/flow/nodelist?id="+window.flow_id,function(data){
        var nodes = data.nodes;
        for (var i = 0; i < nodes.length; i++) {
            var jsonS = nodes[i].node_struct;
            var bootData = JSON.parse(jsonS);
            var htmlbtn = ['<div class="detail-btn-list">',
                            '<button class="detail-btn">查看历史变动</button>',
                            '<button class="detail-btn">编辑</button>',
                            '<button class="detail-btn">提交</button>',
                            '<button class="detail-btn">审核</button>',
                        '</div>'].join('');

            $(".detail-node-list").append("<div class='node-content'><h6 class='node-title'><span class='left'>"+nodes[i].node_name+"</span><span class='right'>"+nodes[i].created_at+"创建</span></h6><div class='node-item' id='node"+ i +"'></div>"+htmlbtn+"</div>")
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
                        window.location.href = "/createtemplate?id="+next_worknode_id;
                    });
                    dialog.find('.login-step-btn').click(function(){
                        window.location.href = "/flow/addnode?id="+window.flow_id + "&tplid="+$(".flow-templatetype-list .active").attr("data-id");
                    });
                }
            });
        });

    });



});
