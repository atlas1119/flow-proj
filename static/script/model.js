
$(function(){
    $("#createModel").click(function(){
        var id = $("#workNodeSelect option:selected").val();
        window.location.href = "/model/createtemplate?id="+id;
    });
});
