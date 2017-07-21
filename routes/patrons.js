var express = require('express');
var router = express.Router();
var Patron = require('../models').Patron;

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

module.exports = router;