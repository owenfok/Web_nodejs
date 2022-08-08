const Product = require('../model/pdmodel');
const User = require('../model/model');

exports.getAllProducts = (req, res, next) => {
    req.user
    console.log(req.user.name)
    Product.find()
        .then(products => {
            res.render('shop', { name: req.user.name, prods: products });
        })
        .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
    // console.log(req.user)
    req.user.addToCart(req.body.id)
        .then(() => {
            res.redirect('/cart');
        }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            // console.log(user);
            res.render('cart', { cart: user.cart, pageTitle: 'Shopping Cart Detail', path: '/cart', name: req.user.name });
        })
        .catch(err => console.log(err));
}

exports.deleteInCart = (req, res, next) => {
    req.user.removeFromCart(req.body.prodId)
        .then(() => {
            res.redirect('/cart');
        }).catch(err => console.log(err));

}