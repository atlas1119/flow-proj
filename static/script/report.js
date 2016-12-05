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

    function getDate(element) {
         var date;
         try {
           date = $.datepicker.parseDate( dateFormat, element.value );
         } catch( error ) {
           date = null;
         }

         return date;
   }

   var dateFormat = "yy-mm-dd",
   from = $( "#datepicker1" )
        .datepicker()
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
   to = $( "#datepicker2" ).datepicker()
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

    $(".search-btn").click(function(){
        var start = $('#datepicker1').val(),
            end = $("#datepicker2").val();
        var date = '', shipName = $("#shipName option:selected").val(),
        xiaoshouDp = $("#xiaoshouDp option:selected").val(),
        upProvider = $("#upProvider option:selected").val(),
        downPerson = $("#downPerson option:selected").val(),
        workerName = $("#workerName option:selected").val(),
        workType = $("#workType option:selected").val();
        if(start && end){
            date = start + ":" + end;
        }

        var param = '';

        if(date){
            param += "date="+date+'&';
        }

        if(shipName){
            param += "ship_name="+shipName+"&";
        }
        if(xiaoshouDp){
            param += "xiaoshou_department="+xiaoshouDp+"&";
        }
        if(upProvider){
            param += "up_provider="+upProvider+"&";
        }
        if(downPerson){
            param += "down_xiaoshou_person="+downPerson+"&";
        }
        if(workerName){
            param += "worker_name="+workerName+"&";
        }
        if(workType){
            param += "work_type="+workType+"&";
        }
        if(window.location.href.indexOf("report/detail") != -1){
            window.location.href = "/report/detail?"+param;
        }else {
            window.location.href = "/report?"+param;
        }


    });


});
