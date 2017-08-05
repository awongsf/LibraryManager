var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;
var Book = require('../models').Book;
var Patron = require('../models').Patron;

Loan.belongsTo(Book);
Book.hasOne(Loan);
Loan.belongsTo(Patron);
Patron.hasMany(Loan);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library Manager' });
});

module.exports = router;
