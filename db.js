const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:GeoQueer@cluster0.etk06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
	await client.connect();
	const collection = await client.db("Places").collection("ratings");
	console.log("Connected to database");
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
