const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json({limit: 100}));
app.get('/', function(req, res) { res.send("Hello World!"); });
app.get('/place/:place', function(req, res) {
	res.json(db.lookupPlace(req.params.place));
});
app.post('/place/:place', function(req, res) {
	if(typeof(req.body.good) === 'boolean') db.scorePlace(req.params.place, req.body.good);
	res.end();
})
app.listen(8080, function() { console.log("Listening for connections..."); });
