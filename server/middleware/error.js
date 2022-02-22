const errorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next,)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //Wrong Mongodb Id Error
    if(err.name == "castError"){
        const message = `Resourse not found Invalid ${err.path}`;
        err = new errorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}