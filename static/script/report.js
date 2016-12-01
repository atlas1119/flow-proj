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

    

});
