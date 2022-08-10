var mongoose = require("mongoose");
var Product = require("./models/product");

var products = [
    {
        image: "img/specials-1.jpg",
        title: "Architecto ut aperiam autem id",
        offer: "20% OFF and more",
        price: 1700
    },
    {
        image: "img/specials-2.jpg",
        title: "Et blanditiis nemo veritatis excepturi",
        offer: "10% OFF and more",
        price: 500
    }
];

function seedDB(){
    Product.remove({}, err => {
        if(err) console.log(err);
        products.forEach(seed => {
            Product.create(seed, (err, product) => {
                if(err) console.log(err);
                product.save();
            });
        });
    });
}

module.exports = seedDB;