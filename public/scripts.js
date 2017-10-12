function passwordMatch(){
    var password=$("#password").val();
    var password_confirm=$("#password_confirm").val();
    console.log("password: "+password);
    console.log("password_confirm: "+password_confirm);
    if(password!==password_confirm){
        $("#matchStatus").html("Password doesn't match");
        $("#register").prop('disabled',true);
    }
    else{
         $("#register").prop('disabled',false);
    }
   
        }
    console.log("hello world");
$(document).ready(function(){
    $("#password_confirm").keyup(passwordMatch());
});
    