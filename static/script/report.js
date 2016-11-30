$(function(){
    var tabDl = $(".report-tab").find("dl");
    tabDl.click(function(){
        if($(this).find("dt").hasClass('list-on')){
            $(this).find("dt").removeClass("list-on");
        }else{
            $(this).find("dt").addClass("list-on");
        }

        $(this).find("dd").toggle();
    });

    $('#datepicker1').datepicker();
    $('#datepicker2').datepicker();
});
