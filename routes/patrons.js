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
  }).catch(function(error){
  	if (error.name === "SequelizeValidationError") {
			res.render('new_patron', { patron: Patron.build(req.body), errors: error.errors, title: 'New Patron'});
		} else {
			throw error;
		}
	}).catch(function(error){
		res.send(500, error);
	});
});

/* Create a new patron form. */
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
	Patron.findById(req.params.id).then(function(patron){
		return patron.update(req.body);
	}).then(function(patron){
		res.redirect("/patrons");        
	});
});

module.exports = router;