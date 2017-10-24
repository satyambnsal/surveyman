var nodemailer=require('nodemailer');

var smtpTransport=nodemailer.createTransport({
    service:"smtp.gmail.com",
    secure:true,
    auth:{
        user:process.env.MAILER_ID,
        pass:process.env.MAILER_PASSWORD
    }
});
console.log("mailer id: "+process.env.MAILER_ID);
console.log("mailer password: "+process.env.MAILER_PASSWORD);
var sendMail=function(host,receiver,callback){
var rand=Math.floor(Math.random()*100+54);
var link="http://"+host+"/verify?id="+rand;
var mailOptions={
    to:receiver,
    subject:"Please confirm your Email account",
    html:"Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions,function(err,response){
    if(err){
        console.log(err)
        callback(err);
    }
    else{
        console.log("Message sent: "+response.message);
        callback(null,response);
    }
})
};
module.exports.sendMail=sendMail;