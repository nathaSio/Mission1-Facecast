var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {
	fs.readFile(path.join(__dirname,'songs.json'),'utf8', function(err, songs) {
		if(err) {
			throw err;
		}

		liste = JSON.parse(songs);
		res.send(liste);
	});
});

module.exports = router;