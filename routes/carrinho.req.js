const express = require("express");

const router = express.Router();

const catchAsync = require("../admin/errors/catchAsync");
const Product = require("../admin/schemas/product");

router.get("/carrinho", catchAsync(async(req, res) => {
    const carrinho = req.session.carrinho;
    let cart = [];

    if (carrinho) {
        for (let i = 0; i < carrinho.length; i++) {
            const item = await Product.findById(carrinho[i]);
            cart.push(item);
        }
    }
    res.render("./pages/carrinho.ejs", { cart });
}));

router.get("/carrinho/adicionar/:id", catchAsync(async(req, res) => {
    const { id } = req.params;
    const carrinho = req.session.carrinho;

    const Produto = await Product.findById(id);
    const nomeProduto = Produto.name;
    const produto = carrinho.find((prod) => prod === id);

    let newProduct;
    if (!produto) {
        req.session.carrinho.push(id);
        newProduct = true;
    } else {
        newProduct = false;
    };

    const response = { nomeProduto, newProduct }
    res.send(response);
}));

router.post('/carrinho/checkout', (req, res) => {

    req.flash("success", "Aquela parte vai ser adicionada em futuras atualizações ;)");
    res.redirect('/home')
});

router.delete("/carrinho/apagar/:id", (req, res) => {
    const { id } = req.params;
    req.session.carrinho.pop(id);

    const response = { id };
    res.send(response);
});

module.exports = router;