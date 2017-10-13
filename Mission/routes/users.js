var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  //res.send('respond with a resource');
  collection.find({},{}, function(e,docs){
  	res.render('users', {
  		"title" : "Liste des utilisateurs",
  		"userlist" : docs
  	});
  });
});

router.get('/insert', function(req,res,next){
	res.render('insert');
});

/* Ajout utilisateur */
router.post('/adduser', function(req, res, next) {
	var db = req.db;
	var userName = req.body.nom;
	var userPassword = req.body.passe;
	var userEmail = req.body.email;
	var collection = db.get('usercollection');

	collection.insert({
		"nom" : userName,
		"passe" : userPassword,
		"email" : userEmail
	}, function(err, doc) {
		if(err){
			res.send("Pas glop !");
		}
		else{
			res.redirect("/users");
		}
	});
});

module.exports = router;
