var express = require('express');
var router = express.Router();
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;
var Book = require('../models').Book;

/* GET Patron Listing page. */
router.get('/', function(req, res, next) {
  Patron.findAll({order: [['id', 'DESC']]}).then(function(patrons){
  	res.render('all_patrons', { patrons: patrons, title: 'Patrons' });
  });
  
});

/* POST create new library patron. */
router.post('/', function(req, res, next) {
  Patron.create(req.body).then(function(patrons) {
    res.redirect('/patrons');
  });
});

/* Create a new book form. */
router.get('/new_patron', function(req, res, next) {
  res.render('new_patron', { patron: Patron.build(), title: 'New Patron' });
});

/* GET Patron Detail */
router.get('/patron_detail/:id', function(req, res, next) {
	Patron.findById(req.params.id).then(function(patron){
		Loan.findAll({
			where: {
				patron_id: patron.id
			},
			include: [
				{
					model: Book
				}
			]
		}).then(function(loans){
			res.render('patron_detail', { patron: patron, loans: loans, title: patron.first_name + " " + patron.last_name });
		});
	});
});

/* PUT Update Patron. */
router.put("/:id", function(req, res, next){
	console.log("TEST");
	Patron.findById(req.params.id).then(function(patron){
		console.log("REQUEST");
		console.log(req);
		return patron.update(req.body);
	}).then(function(patron){
		res.redirect("/patrons");        
	})
});

module.exports = router;