var express = require('express');
var router = express.Router();
var Patron = require('../models').Patron;

/* GET patrons page. */
router.get('/', function(req, res, next) {
  Patron.findAll({order: [['id', 'DESC']]}).then(function(patrons){
  	res.render('all_patrons', { patrons: patrons, title: 'Patrons' });
  });
  
});

module.exports = router;