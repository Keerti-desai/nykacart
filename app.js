let express= require("express");
let app=express();//inisialising
let port=3000
let cors=require('cors')
let mongo=require('mongodb')
let MongoClient=mongo.MongoClient
let mongoUrl="mongodb://127.0.0.1:27017"
let bodyParser = require("body-parser")
let db;

// middleware (supporting library)
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('<h1>Hi from express</h1>')
})
//one more route
 app.get('/cart',(req,res)=>{
     db.collection('cart')
     .find()
    .toArray((err,result)=>{
         if(err) throw err;
         res.send(result)
     })
 })

 app.get('/cart/:id',(req,res)=>{
    let id_ = req.params.id;
    let query={id:Number(id_)}
console.log(id_);
    db.collection('cart')
    .find(query)
   .toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
 ///////////////////////////
 app.get('/datafile',(req,res)=>{
    db.collection('datafile')
    .find()
   .toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//  app.get('/datafile', (req, res) =>{
//     // let id = req.params.id;
//     // let cartId = req.query.cartId
//     // let query = {}

//     // if (cartId) {
//     //     query = {cart: cartId}
//     // }
//     console.log(categoryId);
//     db.collection('datafile').find().toArray((err, result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// }) 
app.get('/datafile?price=one', (req, res) => {
    let categoryId = req.query.one;
    let query = { price:Number( categoryId) };

    db.collection('datafile').find(query).toArray((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving products');
        } else {
            res.send(result);
        }
    });
});


http://localhost:9500/products?categoryId=Gadgets
app.get('/datafile/:categoryId', (req, res) =>{
    let query = {}
    let categoryId = req.params.categoryId;
    let name = req.query.name
    let price = req.query.price
    let rating = req.query.rating
    let description = req.query.description

    if (name) {
        query = {category_id: categoryId, name: name}
    } else if (price && rating) {
        query = {category_id: categoryId, price: price, rating: rating}
    } else if (price) {
        query = {category_id: categoryId, price: price}
    } else if (rating) {
        query = {category_id: categoryId, rating: rating}
    } 
//http://localhost:3000/datafile/name
//Page 2
// product data wrt to product category
// http://localhost:9500/products?categoryId=Gadgets
//# filter on basis of category + brand
//> http://localhost:9500/products/Fashion?brand=Roadster
    console.log(categoryId, name, price, rating);
    db.collection('datafile').find(query).toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
}) 
////////////////////////////////
app.get('/product_detail/:price', (req, res) => {
    let query = {}
    let product = req.params.price
    if (product) {
        query = {price: product}
    }
    console.log(product);
    db.collection('products').find(query).toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

//connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc)=>{
    if (err) {
   console.log('error while connecting')
    }else {
        db=dc.db ('nykacart');;
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
    
} 
});

