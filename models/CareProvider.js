var mongoose=require('mongoose');
var CareProviderSchema=new mongoose.Schema({
    name:String,
    email:String,
    friendliness:Number,
    explanation:Number,
    concernShowed:Number,
    includeInDecision:Number,
    medicationInfo:Number,
    followUpInstructions:Number,
    usedLanguage:Number,
    spentTimeAmount:Number,
    yourConfidenceInProvider:Number,
    youWillRecommend:Number,
    comment:String,
    createdAt:Date,
    updatedAt:Date
});
CareProviderSchema.pre('save',function(next){
    var currentDate=Date();
    this.updatedAt=currentDate;
    if(!this.createdAt){
        this.createdAt=currentDate;
    }
    next();
});
var CareProvider=mongoose.model('CareProvider',CareProviderSchema);
module.exports=CareProvider;