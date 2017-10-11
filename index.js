var express=require('express');
var port=process.env.PORT||8000;
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,'public')));
app.post("/submitForm",function(req,res){
    console.log("REQUEST: ");
    console.log(req.body);
    res.send("Thank you for your feedback!!");
})
app.listen(port,function(){
    console.log("App is listening at port: "+port);
});