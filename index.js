var express=require('express');
var port=process.env.PORT||8000;
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var chalk=require('chalk');
var ejs=require('ejs');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
require('dotenv').config();
var CareProvider=require('./models/CareProvider');
var AdminAccount=require('./models/AdminAccount');
var CommonUtils=require('./utility/commonUtils');
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
var db=mongoose.connection;
app.use(session({
    secret:'surveymanabc123',
    resave:true,
    saveUninitialized:false,
    store:new MongoStore({
        mongooseConnection:db
    })
}));
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
            req.session.userId=user._id;
            chalk.green("authentication success");
            res.render("profile.ejs");
        }
        
    });
    console.log(req.body);
});
app.post("/createAccount",function(req,res){
    console.log(req.body);
var adminAccount=new AdminAccount({
    fullname:req.body.fullname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
});
    adminAccount.save(function(err,user){
        if(err){
            console.error(err);
            res.render("errorPage.ejs",{message:""})
        }
        else{
            console.log(JSON.stringify(user));
            req.session.userId=user._id;
            console.log(chalk.green("registration success"));
            CommonUtils.sendMail("www.satyambansal.com",req.body.email,function(err,response){
                if(err){
                    res.send("error occured while sending an activation link");
                }
                else{
                    res.send("activation link sent successfully");
                }
            });
          }
    });
});
app.get("/logout",function(req,res){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                res.send(err.toString());
            }
            else{
                return res.redirect("/");
            }
        })
    }
});
app.listen(port,function(){
    console.log("App is listening at port: "+port);
});