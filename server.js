var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
let seedDB     = require("./product-seed"),
    Product    = require("./models/product"),
    Cart       = require("./models/cart");

mongoose.connect("mongodb://localhost", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	
// seedDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/scss', express.static(path.resolve(__dirname, "assets/scss")))
app.use('/vendor', express.static(path.resolve(__dirname, "assets/vendor")))

app.get("/", function(req, res){
  Product.find({}, function(err, products){
      if(err){
          console.log(err);
      }
      else{
          res.render("index", {products: products});
      }
  });
});
app.get("/add-to-cart/:id", function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  Product.findById(productId, function(err, product){
      if(err){
          return res.redirect("/profile");
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/profile");
  });
});


app.get("/delete-to-cart/:id", function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  Product.findById(productId, function(err, product){
      if(err){
          return res.redirect("/profile");
      }
      cart.delete(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/profile");
  });

});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);

});


const PORT = process.env.PORT || 8081;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
