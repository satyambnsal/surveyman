var mongoose=require('mongoose');
var AdminAccountSchema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    active:{type:Boolean,default:false}
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