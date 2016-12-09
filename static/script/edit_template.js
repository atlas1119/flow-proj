
$(function(){
    var jsonS = window.node_struct.replace(/&quot;/g,'"');
    var bootData = JSON.parse(jsonS);
    var fb = new Formbuilder({
        selector: '#fbMain',
        bootstrapData: bootData.fields
    });

    // var fb = new Formbuilder({
    //     selector: '#fbMain',
    //     bootstrapData: []
    // });
    fb.mainView.saveFormButton.attr("disabled",false).text("保存");
    
    fb.mainView.lockLeftWrapper();

    fb.on('save', function(payload){
        var name = $("#tempName").val();
        if(name){
            var postData = {
                id: window._id,
                node_name: name,
                work_node_id: window.work_node_id,
                node_struct: payload
            }

            $.post('/edittemplatenodes',postData, function(data){
                if(data.success){
                    $.ext_dialog.open({
                        width: 300,
                        haml: '<div style="text-align:center;margin-bottom:30px;">编辑成功！</div>',
                        buttons:{
                            "确定":function(){
                                window.location.href = "/model";
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


        // console.log(payload);
    });
});
