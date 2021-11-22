const express = require('express');
const router = express.Router();


const catchAsync = require('../admin/errors/catchAsync');
const Product = require('../admin/schemas/product');


router.get('/produtos', catchAsync(async (req, res) => {
    const products = await Product.find({});

    res.render('./pages/produtos.ejs', { products })
}));

module.exports = router;