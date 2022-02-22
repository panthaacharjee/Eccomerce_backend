const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    name : {
        type : String,
    },
    price : {
        type : Number,
    },
    description : {
        type : String,
    },
    stock : {
        type : Number,
        default: 1,
    },
    category : {
        type : String
    },
    rating : {
        type : Number
    },
    image : [
        {
            public_id : {
                type : String,
            },
            url : {
                type : String
            }
        }
    ],
    reviews : [
        {
            name : {
                type : String,
            },
            ratting : {
                type : String,
            },
            comment : {
                type : String
            }
        }
    ],
    createDate :{
        type : String,
        default : Date.now
    }
})

module.exports = mongoose.model("products", productModel);