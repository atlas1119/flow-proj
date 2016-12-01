$(function(){
    var tabDl = $(".report-tab").find("dl");
    tabDl.find("dt").click(function(e){
        if($(this).hasClass('list-on')){
            $(this).removeClass("list-on");
        }else{
            $(this).addClass("list-on");
        }

        $(this).parent().find("dd").toggle();
    });

    // 点击筛选
    // tabDl.find("dd a").click(function(){
    //     tabDl.find("dd").find(".item-on").removeClass('item-on');
    //     $(this).addClass('item-on');
    // });


    function generateHtml(edit){
        var html = ['<div class="user-group-dialog">',
                        '<div class="flow-inline">',
                            '<label class="login-input-icon-1">姓名：</label>',
                            '<input type="text" placeholder="" class="flow-name input-name" autocomplete="off">',
                        '</div>',
                        '<div class="flow-inline">',
                            '<label class="login-input-icon-1">员工编号：</label>',
                            '<input type="text" placeholder="" class="flow-name input-id" autocomplete="off">',
                        '</div>',
                        // '<div class="flow-inline">',
                        //     '<label class="login-input-icon-1">登陆用户名：</label>',
                        //     '<input type="text" placeholder="" class="flow-name input-user" autocomplete="off">',
                        // '</div>',
                        '<div class="flow-inline">',
                            '<label class="login-input-icon-1">手机号：</label>',
                            '<input type="text" placeholder="" class="flow-name input-phone" autocomplete="off">',
                        '</div>',
                        '<div class="flow-inline">',
                            '<label class="login-input-icon-1">邮箱：</label>',
                            '<input type="text" placeholder="" class="flow-name input-email" autocomplete="off">',
                        '</div>',
                        '<div class="flow-inline">',
                            '<label class="login-input-icon-1">默认密码：</label>',
                            '<input type="text" placeholder="" class="flow-name input-password" autocomplete="off">',
                        '</div>',
                        '<div class="flow-inline">',
                            '<label class="login-input-icon-1">所属部门：</label>',
                            '<input type="text" placeholder="" class="flow-name input-department" autocomplete="off">',
                        '</div>',
                        '<div class="btn-container">',
                            '<button class="login-step login-step-1">'+(edit?"保存":"添加员工") +'</button>',
                            '<button class="login-step login-step-2">取消</button>',
                        '</div>',
                    '</div>'].join('');

        return html;
    }

    // 修改用户名
    $(".modify-user").on('click',function(e){
        var user_id = $(this).attr("data-id");

        $.ext_dialog.open({
            title:'修改员工信息',
            width: 600,
            haml: generateHtml(true),
            final: function(){
                var dialog = $(this).parent();
                dialog.addClass("user-group-dialog");
                $.get("/getuserid?id="+user_id, function(data){
                    dialog.find(".input-name").val(data.user.name);
                    dialog.find(".input-id").val(data.user.employee_id);
                    dialog.find(".input-email").val(data.user.email);
                    dialog.find(".input-phone").val(data.user.phone);
                    dialog.find(".input-password").val(data.user.password);
                    dialog.find(".input-department").val(data.user.department);
                });

                dialog.find(".login-step-2").click(function(){
                    $.ext_dialog.close();
                });
                dialog.find(".login-step-1").click(function(){
                    var postData = {
                        id:user_id,
                        name:dialog.find(".input-name").val(),
                        employee_id:dialog.find(".input-id").val(),
                        email:dialog.find(".input-email").val(),
                        phone:dialog.find(".input-phone").val(),
                        password:dialog.find(".input-password").val(),
                        department:dialog.find(".input-department").val()
                    };

                    $.post("/saveuser",postData,function(d){
                        if(d.success){
                            $.ext_dialog.open({
                                width: 300,
                                noclose:true,
                                haml: '<div style="text-align:center;margin-bottom:30px;">修改成功！</div>',
                                buttons:{
                                    "确定":function(){
                                        window.location.href = '/staff';
                                    }
                                }
                            });

                        }
                    });

                });
            }
        });

        return false;
    });

    $("#createUser").click(function(){
            $.ext_dialog.open({
                title:'添加员工',
                width: 600,
                haml: generateHtml(false),
                final: function(){
                    var dialog = $(this).parent();
                    dialog.addClass("user-group-dialog");
                    dialog.find(".login-step-2").click(function(){
                        $.ext_dialog.close();
                    });
                    dialog.find(".login-step-1").click(function(){
                        var postData = {
                            name:dialog.find(".input-name").val(),
                            employee_id:dialog.find(".input-id").val(),
                            email:dialog.find(".input-email").val(),
                            phone:dialog.find(".input-phone").val(),
                            password:dialog.find(".input-password").val(),
                            department:dialog.find(".input-department").val()
                        };

                        $.post("/createuser",postData,function(data){
                            if(data.success){
                                $.ext_dialog.open({
                                    width: 300,
                                    noclose:true,
                                    haml: '<div style="text-align:center;margin-bottom:30px;">创建成功！</div>',
                                    buttons:{
                                        "确定":function(){
                                            window.location.href = '/staff';
                                        }
                                    }
                                });

                            }
                        });

                    });
                }
            });
    });

});
