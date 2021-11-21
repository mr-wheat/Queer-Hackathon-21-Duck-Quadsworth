const { application } = require('express');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:GeoQueer@cluster0.etk06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//connects and loads test data
client.connect(err => {
    if (err) throw err;
  const collection = client.db("Places").collection("ratings");
  console.log("connected to database");
  /*testobj = [
      {placeId: "000001", ratingGood: 5, ratingBad: 7},
      {placeId: "000002", ratingGood: 32, ratingBad: 32},
      {placeId: "000003", ratingGood: 99, ratingBad: 0},
      {placeId: "000004", ratingGood: 1, ratingBad: 19},
      {placeId: "000005", ratingGood: 0, ratingBad: 5},
      {placeId: "000006", ratingGood: 4, ratingBad: 4},
      {placeId: "000007", ratingGood: 2, ratingBad: 1}];
    await collection.insertMany(testobj, function(err, res) {
        if (err) throw err;
        console.log("Number of test documents inserted: " + res.insertedCount);

    });*/
  // perform actions on the collection object
  //client.close();
});

function lookupPlace(placeId) {
    if(client.db("Places").collection("ratings").find({placeId: placeId})) {
        console.log(`lookupPlace(${placeId})`);
        var goodRates = client.db("Places").collection("ratings").findOne({placeId: placeId}).ratingGood;
        var badRates = client.db("Places").collection("ratings").findOne({placeId: placeId}).ratingBad;
        return {good: goodRates, bad: badRates};


    } else {
        console.log(`lookupPlace(${placeId}) had no result`);
        return {good: 0, bad: 0};
};
}

function scorePlace(place, good) {
    console.log(`scorePlace(${placeId}, ${good})`);
    //Check to see if location already exists within database
    var exist = db("Places").collection("ratings").find({placeId: {$exists:true, $in: [place]}});
    if (exist) {
        //It does -- update current value
    if(good) { 
        client.db("Places").collection("ratings").updateOne({placeId: place}, {$inc: {ratingGood: 1}});
    } else {
        client.db("Places").collection("ratings").updateOne({placeId: place}, {$inc: {ratingBad: 1}});
    };
} else {
    //It does not -- insert new database entry 
    if(good) {
        client.db("Places").collection("ratings").insertOne({placeId: place, ratingGood: 1, ratingBad: 0});
    } else {
        client.db("Places").collection("ratings").insertOne({placeId: place, ratingGood: 0, ratingBad: 1});
    };
}
}

exports.lookupPlace = lookupPlace;
exports.scorePlace = scorePlace;
