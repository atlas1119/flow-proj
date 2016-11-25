
$(function(){
    var fb = new Formbuilder({
        selector: '#fbMain',
        bootstrapData: []
    });
    fb.mainView.lockLeftWrapper();

    fb.on('save', function(payload){
        var name = $("#tempName").val();
        if(name){
            var postData = {
                node_name: name,
                work_node_id: window.work_node_id,
                node_struct: payload
            }

            $.post('/createtemplatenodes',postData, function(data){
                if(data.success){
                    $.ext_dialog.open({
                        width: 300,
                        haml: '<div style="text-align:center;margin-bottom:30px;">创建成功！</div>',
                        buttons:{
                            "确定":function(){
                                window.location.reload();
                            }
                        }
                    });
                }
            });
        }else{
            $.ext_dialog.open({
                width: 300,
                haml: '<div style="text-align:center;margin-bottom:30px;">请输入名称</div>',
                buttons:{
                    "确定":function(){
                        $.ext_dialog.close();
                    }
                }
            });
        }



        console.log(payload);
    });
});
