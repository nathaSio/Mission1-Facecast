var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

//Route de base ac nom utilisateur si existant
router.get('/', function(req, res){
	res.render('index', { user : req.user });
});

//Route pr vue destinée à enregistrement d'un utilisateur
router.get('/register', function(req, res){
	res.render('register', { });
});

//Route pr création utilisateur après enreg
router.post('/register', function(req, res) {
	Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
		if(err){
			return res.render('register', { account : account });
		}

		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		});
	});
});

//Route pr vue destinée à connection d'un utilisateur
router.get('/login', function(req, res){
	res.render('login', { user : req.user });
});

//Route pr rediriger l'utilisateur sur site après authentification (POST)
router.post('/login', passport.authenticate('local'), function(req, res){
	res.redirect('/');
});

//Route pr demande déconnexion
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});*/


/* GET home page. */
/*router.get('/n/:nom', function(req, res, next) {
  leNom = req.params.nom;
  res.render('index', { title: leNom });
});*/

module.exports = router;
