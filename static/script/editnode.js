$(function(){

    var jsonS = window.node_struct.replace(/&quot;/g,'"');
    var bootData = JSON.parse(jsonS);
    var fb = new Formbuilder({
        selector: '#formMain',
        bootstrapData: bootData.fields
    });
    var container = fb.mainView.$responseFields;
    $("#formMain").html(container.html());
    // fb.mainView.lockLeftWrapper();
    // fb.mainView.$fbLeft.hide();
    // fb.mainView.saveFormButton.hide();
    $("#formMain").find(".cover").hide();
    // container.parent().css({'margin-left':'0','padding-top':'0','border-left':'none','padding-left':0,'min-height': 'auto'})
    $("#formMain").find(".actions-wrapper").hide();

    // 保存按钮
    $("#detailSave").on("click", function(){
        var list = $("#formMain").find(".fb-field-wrapper");
        list.each(function(i, item){
            var s_class = $(item).attr("class").split(" ")[1];
            var type = s_class.replace("response-field-","");
            if(type == 'text' || type == 'number' || type == 'paragraph' || type == 'date'){
                for (var i = 0; i < bootData.fields.length; i++) {
                    if(bootData.fields[i].field_type == type){
                        bootData.fields[i].field_options.value = $(item).find("input").val();
                    }
                }
            }else if(type == 'doubletext'){
                for (var i = 0; i < bootData.fields.length; i++) {
                    if(bootData.fields[i].field_type == type){
                        bootData.fields[i].field_options.value = $(item).find("input.value").val();
                        bootData.fields[i].field_options.value1 = $(item).find("input.value1").val();
                    }
                }
            }else if(type == 'textdropdown'){
                for (var i = 0; i < bootData.fields.length; i++) {
                    if(bootData.fields[i].field_type == type){
                        bootData.fields[i].field_options.value = $(item).find("input").val();
                        var options = bootData.fields[i].field_options.options;
                        for (var j = 0; j < options; j++) {
                            options[j].checked = $(item).find("option").get(j).selected;
                        }
                    }
                }
            }else if(type == 'textdropdown_cost'){
                for (var i = 0; i < bootData.fields.length; i++) {
                    if(bootData.fields[i].field_type == type){
                        bootData.fields[i].field_options.rate = $(item).find("input.rate").val();
                        bootData.fields[i].field_options.value = $(item).find("input.cost").val();
                    }
                }
            }else{
                for (var i = 0; i < bootData.fields.length; i++) {
                    if(bootData.fields[i].field_type == type){
                        var options = bootData.fields[i].field_options.options;
                        for (var j = 0; j < options; j++) {
                            options[j].checked = (type == 'dropdown'?$(item).find("option").get(j).selected:$(item).find("input").get(j).checked);
                        }
                    }
                }
            }
        });

        var postData = {
            id: window.node_id,
            node_struct: JSON.stringify(bootData),
            node_reviewer: $("#reviewerId").val(),
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
