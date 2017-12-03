var con = require('./../config');

var MongoClient = require('mongodb').MongoClient;


function addEats(collection, object) {
    MongoClient.connect(con, function(err, db) {
        if(err) {
            throw err;
        }else {
            if(object.length > 1){
                db.collection(collection).insertMany(object, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    db.close();
                });
            }else{
                db.collection(collection).insertOne(object, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    db.close();
                });
            }
        }
    });

}


function selectEats(collection, query){
    MongoClient.connect(con, function(err, db) {
        if (err) throw err;
        db.collection(collection).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        });
    });
}

function removeEats(collection, query){
    MongoClient.connect(con, function(err, db) {
        if (err) throw err;
        db.collection(collection).deleteOne(query, function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

function findAllEats(collection){
    MongoClient.connect(con, function(err, db) {
        if (err) throw err;
        db.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        });
    });
}

module.exports = {

    addEats: addEats,
    removeEats: removeEats,
    selectEats: selectEats,
    findAllEats: findAllEats

};