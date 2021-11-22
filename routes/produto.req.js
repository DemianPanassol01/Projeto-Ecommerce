const express = require("express");
const router = express.Router();

const catchAsync = require("../admin/errors/catchAsync");
const Product = require("../admin/schemas/product");

router.get(
  "/produto/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.render("./pages/produtoSingle.ejs", { product });
  })
);

module.exports = router;
