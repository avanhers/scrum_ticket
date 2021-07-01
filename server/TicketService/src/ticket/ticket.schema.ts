import {Schema,model}  from 'mongoose';

const UserSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required:true
     },
     password: {
        type:String,
        required:true,
     },
    role:String,
   }
);
var  User = model('User',UserSchema) 

export const TicketSchema = new Schema({
     
    name: {
        type:String,
        unique:true,
        required:true
    },
    description: {
        type:String,
        required:true,
    },
    createdBy: {
        type:Schema.Types.ObjectId
        , 
        ref:"User"
    },
    status:{
        type:String,
        enum:['New','Ready','In progress','Ready for test', 'Done','Archived'],
        default:'New'
    }
});