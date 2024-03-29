const Product = require('../database/models/productModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFetures');


// Create Product ---Admin
exports.createProduct = catchAsyncError(async(req, res)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    })
})

// Get All Product 
exports.getAllProducts = catchAsyncError(async(req, res)=>{
    const apiFeature = new ApiFeatures(Product.find(), req.query).search();
    const products = await apiFeature.query;
    res.status(201).json({
        success : true,
        products
    })    
})

// Update Product ---Admin 
exports.updateProduct = catchAsyncError(async(req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new errorHandler("Product not found", 400));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators : true,
        useFindAndModify : false
     });
     res.status(200).json({
         success : true,
         product
     })
})

// Delete Product ---Admin 
exports.deleteProduct = catchAsyncError(async(req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new errorHandler("Product not found", 400));
    }
    await product.remove();
    res.status(200).json({
        success : true,
        statusCode : 200, 
        message: "Product successfully deleted"
    })
})


//Product Create for Product
exports.createProducts= catchAsyncError(async(req, res)=>{
    let product = await Product.findOne(req.params.id);
    if(!product){
        return next(new errorHandler("Product is a created for non user"));
    }
    await product.create(req.body);
})