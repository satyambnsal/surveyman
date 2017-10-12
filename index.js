var express=require('express');
var port=process.env.PORT||8000;
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var chalk=require('chalk');
var ejs=require('ejs');
var CareProvider=require('./models/CareProvider');
var AdminAccount=require('./models/AdminAccount');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
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
});
app.post("/login",function(req,res){
    console.log("REQ BODY");
     console.log(req.body);
    AdminAccount.authenticateUser(req.body.username,req.body.password,function(err,user){
        if(err){
            console.log(JSON.stringify(err));
            res.render('errorPage.ejs');
        }
        else{
            chalk.green("authentication success");
            res.render("profile.ejs");
        }
        
    });
    console.log(req.body);
});
app.post("/createAccount",function(req,res){
    console.log(req.body);
var adminAccount=new AdminAccount({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
});
    adminAccount.save(function(err){
        if(err){
            console.error(err);
            res.send("Internal server error occured");
        }
        else{
            console.log(chalk.green("registration success"));
            res.send("You have registered successfully");
        }
    });
});
app.listen(port,function(){
    console.log("App is listening at port: "+port);
});