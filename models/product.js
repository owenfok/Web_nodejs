const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    imagePath: String,
    productname: String,
    description: String,
    price: Number
});
Product = mongoose.model('Product', userSchema);

module.exports =  Product;
