var mongoose=require('mongoose');
var _=require('lodash');
var AdminAccountSchema=mongoose.Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    active:{type:Boolean,default:false}
});

AdminAccountSchema.pre('save',function(next){
var user=this;
AdminAccount.findOne({$or:[{username:user.username},{email:user.email}]},function(err,users){
        if(err){
            return next(err);
        }
        else if(users){
            if(_.find(users,{email:user.email})){
                user.invalidate('email',"email is already registered");
                next(new Error("email is already registered"));
            }
            else if(_.find(users,{username:user.username})){
                user.invalidate('username',"username is already taken");
                next(new Error('username is already taken'));
            }
        }
        else{
            console.log("inside else");
            next();
        }
    })
});
AdminAccountSchema.statics.authenticateUser=function(username,password,callback){
    this.findOne({"username":username},function(err,user){
    if(err){
        return callback(err);
    }
    else if(!user){
        var err=new Error("User not found");
        err.status=401;
        return callback(err);
    }
    else if(password!==user.password){
        var err=new Error("Bad credentials:password doesn't match with given usename");
        err.status=401;
        callback(err);
    }
    else
    return callback(null,user);
});
}
var AdminAccount=mongoose.model('AdminAccount',AdminAccountSchema); 
module.exports=AdminAccount;