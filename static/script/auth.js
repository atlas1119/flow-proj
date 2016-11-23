$(function(){
    $("#loginBtn").click(function(){
        var name = $('input[name="name"]').val();
        var password = $('input[name="password"]').val();

        $.post('/login',{name:name, password:password},function(data){
            if(data.error){
                alert(data.error);
                return false;
            }else{
                window.location.href = '/';
            }
        });

    });
});
