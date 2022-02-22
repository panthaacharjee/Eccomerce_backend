const catchAsyncError = require('../middleware/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const userModel = require("../database/models/userModel");
const sendToken = require("../utils/jwToken");

// Registre User 
exports.registerUser = catchAsyncError(async(req, res, next)=>{
    const {name, email, password} = req.body;
    const user =  await userModel.create({
        name, email, password,
        avatar : {
            public_id : "this is a sample id", 
            url : "profilePicUrl"
        }
    });
  
    sendToken(user, 201, res);

});


// Login User 
exports.loginUser = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new errorHandler("Please enter email & password", 400));
    }

    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        return next(new errorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new errorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsyncError(async(req, res, next)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly : true,
    });
    
    res.status(200).json({
        success : true, 
        message : "Logged Out",
    })
})