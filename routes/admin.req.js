const express = require("express");
const multer = require("multer");
const catchAsync = require("../admin/errors/catchAsync");
const Product = require("../admin/schemas/product");
const { storage, cloudinary } = require("../admin/cloud/cloudinary");
const { isAuthenticated, souEu } = require('../admin/utils/middlewares');

const router = express.Router();
const upload = multer({ storage });

router.get("/admin", isAuthenticated, catchAsync(async(req, res) => {
    const products = await Product.find({});

    res.render("./admin/admin.ejs", { products });
}));

router.get("/admin/adicionar_produto", isAuthenticated, souEu, (req, res) => {
    res.render("./admin/addProduto.ejs");
});

router.post("/admin/adicionar_produto", isAuthenticated, souEu, upload.array("imagens"), catchAsync(async(req, res) => {
    const { product } = req.body;

    const addProduct = new Product(product);
    addProduct.imagens = req.files.map((image) => ({
        url: image.path,
        filename: image.filename,
    }));
    await addProduct.save();
    req.flash("success", "Produto Adicionado com Sucesso");
    res.redirect("/admin/adicionar_produto");
}));

router.get("/admin/editar_produto/:id", isAuthenticated, souEu, catchAsync(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.render("./admin/editProduto.ejs", { product });
}));

router.put("/admin/editar_produto/:id", isAuthenticated, souEu, upload.array("imagens"), catchAsync(async(req, res) => {
    const { id } = req.params;
    const { product, delImage } = req.body;

    const editProduct = await Product.findByIdAndUpdate(
        id, {...product }, { new: true }
    );

    if (delImage) {
        if (typeof delImage === "object") {
            for (let image in delImage) {
                await cloudinary.uploader.destroy(image);
            }
        } else {
            await cloudinary.uploader.destroy(delImage);
        }

        await editProduct.updateOne({
            $pull: { imagens: { filename: { $in: delImage } } },
        });
    }

    const img = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    editProduct.imagens.push(...img);
    await editProduct.save();

    req.flash("success", "Produto Editado com Sucesso");
    res.redirect("/admin");
}));

router.delete("/admin/:id", isAuthenticated, souEu, catchAsync(async(req, res) => {
    const { id } = req.params;

    const produto = await Product.findByIdAndDelete(id);
    const imagens = produto.imagens;

    if (typeof imagens === "object") {
        for (let i = 0; i < imagens.length; i++) {
            await cloudinary.uploader.destroy(imagens[i].filename);
        }
    } else {
        await cloudinary.uploader.destroy(imagens.filename);
    }

    req.flash("success", "Produto Deletado com Sucesso");
    res.redirect("/admin");
}));

module.exports = router;