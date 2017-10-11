var express=require('express');
var port=process.env.PORT||8000;
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var CareProvider=require('./models/CareProvider');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,'public')));
/*
we can also use following:
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
*/
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/surveyman");
app.post("/submitForm",function(req,res){
    console.log("REQUEST: ");
    console.log(req.body);
//for(var property in req.body){
//    if(req.body.hasOwnProperty(property)){
//        
//    }
//}
var formData=new CareProvider(req.body);
    formData.save(function(err){
        if(err) throw err;
        console.log("data saved successfully");
    });
    res.send("Thank you for your feedback!!");
})
app.listen(port,function(){
    console.log("App is listening at port: "+port);
});