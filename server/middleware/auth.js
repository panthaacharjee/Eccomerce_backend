const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userSchema = require("../database/models/userModel");


// Authenticate User
exports.isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new errorHandler("Please login to access this resource", 401))
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userSchema.findById(decodeData.id);

    next();
});

// Authenticate For Admin
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           return next( new errorHandler(
                    `Role : ${req.user.role} is not allowed to access this resource`, 403
                ));
        }
        next();
    }
}