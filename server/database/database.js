const mongoose = require('mongoose');

const ConnectDatabase = ()=>{
    mongoose.connect(process.env.DB, {
        useNewUrlParser : true,
    }).then(()=>{
        console.log("Mongodb connecting on server");
    })
}
module.exports = ConnectDatabase;