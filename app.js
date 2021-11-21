const express = require('express');
const db = require('./db');
const app = express();

const connecting = db.connect();
app.use(express.json({limit: 100}));
app.use(express.static('static'));
connecting.then(database => {
	app.get('/place/:place', async (req, res) => {
		res.json(await database.lookupPlace(req.params.place));
	});
	app.post('/place/:place', async (req, res) => {
		if(typeof(req.body.good) === 'boolean') await database.scorePlace(req.params.place, req.body.good);
		res.end();
	})
	app.listen(8080, function() { console.log("Listening for connections..."); });
})
