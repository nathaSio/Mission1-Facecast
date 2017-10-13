/* Ajout d'un utilisateur */
router.post('/adduser', function(req, res, next) {
	var db = req.db;
	var userName = req.body.nom;
	var userPassword = req.body.passe;
	var userEmail = req.body.email;
	var collection = db.get('usercollection');
	
	collection.insert({
		"nom" : userName,
		"passe" : userPassword,
		"email": userEmail
	}, function (err, doc) {
		if (err) {
			res.send("Pas glop !");
		} else {
			// Redirection vers la liste, donc vers une vue existante
			res.redirect("/users");
		}
	});
});