var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('./app/mongo');
var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

});

var port = process.env.PORT || 3000;
var rout = express.Router();


rout.use(function (req,res,next) {
    next()
});

app.get('/api', function (req,res) {
    res.send({name:'Yoshi'});
});

app.get('/yelp/:terms/:language', function (req, res) {
    console.log('Get request');
    res.json({message:"Yelp endpoint"});

});


rout.route('/lab/insert')

    .post(function (req,res) {
        var eats ={
            name: req.body.name,
            type: req.body.type
        };
        mongo.addEats("lab9collection",eats);
        res.json({message: "Added "+eats.name+ " to MongoDB"})
    });


rout.route('/lab/delete')
    .post(function(req, res) {
        var food = {
            name: req.body.name
        }

        mongo.removeEats("Lab9Collection", food);

        res.json({ message: "Removed " + food.name + " from MongoDB"})
    });


rout.get('/yelp/:terms/:language', function (req, res) {
    console.log('Get request');
    res.json({message:"Yelp endpoint"});

});


rout.get('/lab/food',function (req,res) {
    var getresponse = mongo.findAllEats("lab9collection");
    res.json(getresponse);
});

rout.get('/',function (req,res) {
    res.json({message:'listening for request'})
});

app.use('/api', rout);

app.listen(port);