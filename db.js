const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:GeoQueer@cluster0.etk06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
	await client.connect();
	const collection = await client.db("Places").collection("ratings");
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
	return {
		lookupPlace: async (placeId) => {
			const result = await collection.findOne({placeId: placeId});
			return result ? {good: result.ratingGood, bad: result.ratingBad} : {good: 0, bad: 0};
		},
		scorePlace: async (placeId, good) => {
			const exists = await collection.findOne({placeId: placeId});
			if(exists) collection.updateOne({placeId: placeId}, {$inc: good ? {ratingGood: 1} : {ratingBad: 1}})
			else collection.insertOne({placeId: placeId, ratingGood: good ? 1 : 0, ratingBad: good ? 0 : 1});
		}
	};
}
exports.connect = connect;
