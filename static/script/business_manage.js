$(function(){

    // var jsonS = window.node_struct.replace(/&quot;/g,'"');
    // var bootData = JSON.parse(jsonS);
    // var fb = new Formbuilder({
    //     selector: '#formMain',
    //     bootstrapData: bootData.fields
    // });
    // var container = fb.mainView.$responseFields;
    // $("#formMain").html(container.html());
    // fb.mainView.lockLeftWrapper();
    // fb.mainView.$fbLeft.hide();
    // fb.mainView.saveFormButton.hide();
    // if(window.edit != '0'){
    //     $("#formMain").find(".cover").hide();
    // }
    // container.parent().css({'margin-left':'0','padding-top':'0','border-left':'none','padding-left':0,'min-height': 'auto'})
    // $("#formMain").find(".actions-wrapper").hide();

    // 保存按钮
    $("#detailSave").on("click", function(){

        var rezhi = $("input[name='rezhi']").val();
        var rezhijitai = $("input[name='rezhijitai']").val();
        var liufen = $("input[name='liufen']").val();
        var liufenjitai = $("input[name='liufenjitai']").val();
        var hetongshuliang = $("input[name='hetongshuliang']").val();
        var rongrendu = $("input[name='rongrendu']").val();
        var maoyifangshi = $("input[name='maoyifangshi']").val();
        var fukuangfangshi = $("input[name='fukuangfangshi']").val();
        var zhuanggangjigou = $("input[name='zhuanggangjigou']").val();
        var zhuanggangbiaozhun = $("input[name='zhuanggangbiaozhun']").val();
        var shouzaiqi = $("input[name='shouzaiqi']").val();
        var zhuanggang = $("input[name='zhuanggang']").val();

        var hetonghao = $("input[name='hetonghao']").val();
        var qiandingriqi = $("input[name='qiandingriqi']").val();
        var hetongdanjia = parseFloat($("input[name='hetongdanjia']").val()) * parseFloat($("input[name='danjia_huilv']").val() || 1);
        var hetongjine = parseFloat($("input[name='hetongjine']").val()) * parseFloat($("input[name='jine_huilv']").val() || 1);
        var buy_gongsi = $("input[name='buy_gongsi']").val();
        var sell_gongsi = $("input[name='sell_gongsi']").val();

        var postData = {
            id: window.node_id,
            rezhi:rezhi,
            rezhijitai:rezhijitai,
            liufen:liufen,
            liufenjitai:liufenjitai,
            hetongshuliang:hetongshuliang,
            rongrendu:rongrendu,
            maoyifangshi:maoyifangshi,
            fukuangfangshi:fukuangfangshi,
            zhuanggangjigou:zhuanggangjigou,
            zhuanggangbiaozhun:zhuanggangbiaozhun,
            shouzaiqi:shouzaiqi,
            zhuanggang:zhuanggang,

            hetonghao:hetonghao,
            qiandingriqi:qiandingriqi,
            hetongdanjia:hetongdanjia,
            hetongjine:hetongjine,
            buy_gongsi:buy_gongsi,
            sell_gongsi:sell_gongsi,

            node_reviewer: $("#reviewerId").val(),
            node_struct: "{\"fields\":[]}",
            node_reviewer_id: $("#reviewerId").attr("data-user-id"),
            next_worknode_id: $("#workNodeSelect").children('option:selected').val(),
        };

        $.post("/saveeditnode",postData, function(data){
            if(data.success){
                $.ext_dialog.open({
                    width: 300,
                    haml: '<div style="text-align:center;margin-bottom:30px;">保存成功！</div>',
                    buttons:{
                        "确定":function(){
                            window.location.href = "/flow/detail?id=" + data.flow[0]._id;
                        }
                    }
                });
            }
        });

    });

    $("#datepicker").datepicker();

    $("#workNodeSelect").change(function(){
        // var index = $('#workNodeSelect')[0].selectedIndex;
        var selectedOption = $(this).children('option:selected');
        var userId = selectedOption.attr("data-user-id");
        $.get("/getuserid?id="+userId, function(data){
            $("#personManageId").html("对接人："+data.user.name);
            $("#reviewerId").val(data.user.name).attr("data-user-id",userId);
        });
    });



});
