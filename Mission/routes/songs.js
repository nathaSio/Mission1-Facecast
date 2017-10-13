var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var ms = require('mediaserver');

//Liste la vue des titres
router.get('/', function(req, res, next) {
	var tabSongs = [];
	fs.readFile(path.join(__dirname,'../rest/songs.json'),'utf8', function(err, songs) {
		if(err) {
			throw err;
		}

		var resultat = JSON.parse(songs);
		var liste = resultat.songs;

		for(var i in liste){
			tabSongs.push(liste[i].titre);
		}

		res.render('songs', { title: 'MusicJS', tabSongs: tabSongs});
	});
});

//Joue le morceau
router.get('/:morceau', function(req, res, next){
	var chanson = path.join(__dirname,'../songs',req.params.morceau);
	ms.pipe(req, res, chanson+'.mp3');
});

module.exports = router;