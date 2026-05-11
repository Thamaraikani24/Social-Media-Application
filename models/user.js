const { required } = require('joi');
const mongoose=require('mongoose');
const { profile } = require('node:console');
const { type } = require('node:os');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number
    },
    bio:{
        type:String,
        maxlength:250
    },
    profilePicture:{
        type:String
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    following: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    followRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
