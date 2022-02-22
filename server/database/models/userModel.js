const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : [true, "Please enter your name"], 
        minLength: [4, "Please enter 4 character  minimum length"]
    },
    email: {
        type: String, 
        required : [true, "Please enter your email"],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid email"]
    }, 
    password : {
        type : String,
        required : [true, "Please enter your password"],
        minLength : [8, "Please enter 8 character password"],
        select: false
    },
    avatar : [
        {
            public_id : {
                type : String,
            },
            url : {
                type : String
            }
        }
    ],
    role : {
        type : String,
        default : "user",
    },
    resetPasswordToken : String,
    resetPasswordExpired : Date,
});


// Hashing Password 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
    });
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("user", userSchema);