const express = require("express");
const router = express.Router();

const catchAsync = require("../admin/errors/catchAsync");
const Product = require("../admin/schemas/product");

router.get("/home", catchAsync(async(req, res) => {
    const products = await Product.find({});

    req.session.carrinho = req.session.carrinho || [];
    res.render("./pages/home.ejs", { products });
}));

module.exports = router;