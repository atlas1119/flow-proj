
$(function(){
    $("#createModel").click(function(){
        var id = $("#workNodeSelect option:selected").val();
        window.location.href = "/model/createtemplate?id="+id;
    });

    $(".default-btn").click(function(){
        var id = $(this).attr('data-id');
        $.ext_dialog.open({
            width: 300,
            haml: '<div style="text-align:center;margin-bottom:30px;">您确定要删除吗？</div>',
            buttons:{
                "确定":function(){
                    $.post('deletemodel',{id:id},function(data){
                        if(data.success){
                            $.ext_dialog.open({
                                width: 300,
                                haml: '<div style="text-align:center;margin-bottom:30px;">删除成功！</div>',
                                buttons:{
                                    "确定":function(){
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    })
                },
                "取消": function(){
                    $.ext_dialog.close();
                }
            }
        });
        return false;
    });
});
