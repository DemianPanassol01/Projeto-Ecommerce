const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const ProductSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Campo nome não pode estar vazio']
    },
    descricao: {
        type: String,
        require: [true, 'Deve possuir uma descrição']
    },
    preco: {
        type: String,
        require: [true, 'Produto deve conter um preço'],
        min: 0
    },
    imagens: [ImageSchema]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
