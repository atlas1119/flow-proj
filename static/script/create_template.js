
$(function(){
    var fb = new Formbuilder({
        selector: '#fbMain',
        bootstrapData: [

        ]
    });



    // console.log("###",payload);

    fb.on('save', function(payload){


        fb.mainView.collection.sort();
        payload = JSON.stringify({
          fields: fb.mainView.collection.toJSON()
        });

        console.log(payload);
    });
});
