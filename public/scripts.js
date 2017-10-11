function passwordMatch(){
    var password=$("#password").val();
    var password_confirm=$("#password_confirm").val();
    if(password!=password_confirm)
        $("#matchStatus").html("Password doesn't match");
    else
        $("#matchStatus").html("Password match");
};
$(document).ready(function(){
    console.log("hello world");
    $("password_confirm").keyup(passwordMatch);
});