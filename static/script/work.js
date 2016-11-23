$(function(){
    var postData = {};
    // 选择类型
    function selectType(dom){
        dom.click(function(){
            dom.parent().find('.active').removeClass('active');
            $(this).addClass('active');
        });
    }

    function getNodes(dom){
        $.get('/getworknodes', function(data){
            var html = '';
            for (var i = 0; i < data.nodes.length; i++) {
                if(i == 0){
                    html += '<li class="active" data-id="'+ data.nodes[i]._id +'">'+data.nodes[i].node_name+'</li>'
                } else {
                    html += '<li>'+data.nodes[i].node_name+'</li>';
                }
            }

            dom.html(html);
        });
    }

    function actionStep2(){
        var step_2_html = ['<div class="flow-group-dialog">',
                        '<h3 class="flow-title">第二步(共三步)</h3>',
                        '<div class="flow-step-container">',
                            '<div class="step-container-1">',
                                '<div class="step-round active">1</div><span>选择业务模式</span>',
                            '</div>',
                            '<div class="step-line active" style="left: 43px;top: 15px;"></div>',
                            '<div class="step-container-2">',
                                '<div class="step-round active">2</div><span>选择工作节点</span>',
                            '</div>',
                            '<div class="step-line" style="left: 191px;top: 15px;"></div>',
                            '<div class="step-container-3">',
                                '<div class="step-round">3</div><span>完成</span>',
                            '</div>',
                        '</div>',
                        '<div class="flow-type-container">',
                            '<h6 class="flow-type-title">推荐工作节点：</h6>',
                            '<ul class="flow-type-list step-2 clearfix">',
                                '加载中...',
                            '</ul>',
                        '</div>',
                        '<button class="login-step-btn step-2">下一步</button>',
                    '</div>'].join('');
        $.ext_dialog.open({
            title:'',
            width: 790,
            haml: step_2_html,
            final: function(){
                var dialog = $(this).parent();
                dialog.addClass("flow-group-dialog");
                selectType(dialog.find('.flow-type-list li'));
                getNodes(dialog.find('.flow-type-list'));
                dialog.find('.login-step-btn').click(function(){

                    postData.flow_nodes = {
                        node_name: dialog.find(".flow-type-list .active").text(),
                        node_struct: '{name:"日期"}',
                        node_reviewer: '小于',
                        node_reviewer_id: '583507c53e78301b784e3573'
                    };

                    actionStep3();
                });
            }
        });
    }

    function actionStep3(){
        var step_3_html = ['<div class="flow-group-dialog">',
                        '<h3 class="flow-title">第三步(共三步)</h3>',
                        '<div class="flow-step-container">',
                            '<div class="step-container-1">',
                                '<div class="step-round active">1</div><span>选择业务模式</span>',
                            '</div>',
                            '<div class="step-line active" style="left: 43px;top: 15px;"></div>',
                            '<div class="step-container-2">',
                                '<div class="step-round active">2</div><span>选择工作节点</span>',
                            '</div>',
                            '<div class="step-line active" style="left: 191px;top: 15px;"></div>',
                            '<div class="step-container-3">',
                                '<div class="step-round active">3</div><span>完成</span>',
                            '</div>',
                        '</div>',
                        '<div class="flow-content-container">',
                            '<h6 class="content-title">请确认填写信息</h6>',
                            '<div class="content">',
                                '<span class="left-text">业务流名称：</span><span>'+ postData.flow_name +'</span>',
                                '<span class="left-text">开始日期：</span><span>'+ postData.start_time +'</span>',
                                '<span class="left-text">当前工作节点：</span><span>'+ postData.flow_nodes.node_name +'</span>',
                                '<span class="left-text">业务品种：</span><span>'+postData.flow_breed+'</span>',
                            '</div>',
                        '</div>',
                        '<div class="btn-container">',
                            '<button class="login-step login-step-1">创建完成</button>',
                            '<button class="login-step login-step-2">取消</button>',
                        '</div>',
                    '</div>'].join('');
        $.ext_dialog.open({
            title:'',
            width: 790,
            haml: step_3_html,
            final: function(){
                var dialog = $(this).parent();
                dialog.addClass("flow-group-dialog");
                selectType(dialog.find('.flow-type-list li'));
                dialog.find(".login-step-2").click(function(){
                    $.ext_dialog.close();
                });
                dialog.find(".login-step-1").click(function(){
                    $.post("/createflow",postData,function(data){
                        if(data.success){
                            $.ext_dialog.open({
                                width: 300,
                                haml: '<div style="text-align:center">创建成功！</div>',
                                buttons:{
                                    "确定":function(){
                                        window.location.reload(true);
                                    }
                                }
                            });

                        }
                    });

                });
            }
        });
    }

    $("#createFlow").click(function(){
        var step_1_html = ['<div class="flow-group-dialog">',
                        '<h3 class="flow-title">第一步(共三步)</h3>',
                        '<div class="flow-step-container">',
                            '<div class="step-container-1">',
                                '<div class="step-round active">1</div><span>选择业务模式</span>',
                            '</div>',
                            '<div class="step-line" style="left: 43px;top: 15px;"></div>',
                            '<div class="step-container-2">',
                                '<div class="step-round">2</div><span>选择工作节点</span>',
                            '</div>',
                            '<div class="step-line" style="left: 191px;top: 15px;"></div>',
                            '<div class="step-container-3">',
                                '<div class="step-round">3</div><span>完成</span>',
                            '</div>',
                        '</div>',
                        '<div class="flow-type-container">',
                            '<ul class="flow-type-list clearfix">',
                                '<li class="active">贸易</li>',
                                '<li>供应链金融</li>',
                                '<li class="last">期现结合</li>',
                            '</ul>',
                        '</div>',
                        '<div class="flow-form-container">',
                            '<div class="flow-form-list">',
                                '<div class="flow-inline">',
                                    '<label class="login-input-icon-1">业务品种：</label>',
                                    '<div class="select">',
                                          '<select name="make">',
                                            '<option value="棉花">棉花</option>',
                                            '<option value="钢铁">钢铁</option>',
                                            '<option value="煤炭" selected="">煤炭</option>',
                                          '</select>',
                                    '</div>',
                                '</div>',
                                '<div class="flow-inline">',
                                    '<label class="login-input-icon-1">业务名称：</label>',
                                    '<input type="text" placeholder="" class="flow-name input-name" autocomplete="off">',
                                '</div>',
                                '<div class="flow-inline rili-inline">',
                                    '<label class="login-input-icon-1">开始时间：</label>',
                                    '<input id="datepicker" type="text" placeholder="" class="flow-name input-time" autocomplete="off" readonly>',
                                    '<i class="rili-icon"></i>',
                                '</div>',
                                '<div class="flow-inline">',
                                    '<label class="login-input-icon-1"></label>',
                                    '<button class="login-step-btn">下一步</button>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>'].join('');
        $.ext_dialog.open({
            title:'',
            width: 790,
            haml: step_1_html,
            final: function(){
                var dialog = $(this).parent();
                dialog.addClass("flow-group-dialog");
                selectType(dialog.find('.flow-type-list li'));
                dialog.find("#datepicker").datepicker();
                dialog.find('.login-step-btn').click(function(){
                    postData.flow_breed = dialog.find(".flow-type-list .active").text();
                    postData.flow_type = dialog.find("select[name='make']").val();
                    postData.flow_name = dialog.find("input.input-name").val();
                    postData.start_time = dialog.find("input.input-time").val();
                    actionStep2();
                });
            }
        });


    });
});
