const dotenv = require('dotenv');
const app = require("./app");
const connectDatabase = require('./database/database');

// Handeling uncaught exception 
process.on("unhandledRejection", err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception rejection`);
    process.exit(1);
})

// Config file 
dotenv.config({path: "./config.env"});


// Database Connection 
connectDatabase();

// Server run
const server = app.listen(process.env.PORT, ()=>{
    console.log("Server is run on "+ process.env.PORT);
})

// Unhandle Project Rejection 
process.on("unhandledRejection", err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandle promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})