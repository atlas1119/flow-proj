$(function(){
    $(".nav-header-right").click(function(){
        if($(this).attr("data-index") != "1"){
            $(this).find(".nav-tips-container").show();
            $(this).attr("data-index", "1");
        }else{
            $(this).find(".nav-tips-container").hide();
            $(this).attr("data-index", "0");
        }

        return false;
    });

    $("body").click(function(){
        $(".nav-tips-container").hide();
        $(".nav-header-right").attr("data-index", "0");
    });
});
