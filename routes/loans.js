var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;
var Book = require('../models').Book;
var Patron = require('../models').Patron;

Loan.belongsTo(Book);
Book.hasOne(Loan);
Loan.belongsTo(Patron);
Patron.hasMany(Loan);

/* GET Loan Listing page. */
router.get('/', function(req, res, next) {
	Loan.findAll({
		include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(function(loans){
		//res.json(loans)
		res.render('all_loans', { loans: loans, title: 'Loans' });
	});
  
});

/* GET Checked Out Loans page. */
router.get('/checked_loans', function(req, res, next) {
	Loan.findAll({
		where: {
      		returned_on: null
    	},
    	include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(function(loans){
		res.render('all_loans', { loans: loans, title: 'Checked Out Books' });
	});
});

/* GET Overdue Loans page. */
router.get('/overdue_loans', function(req, res, next) {
	Loan.findAll({
		where: {
	      return_by: {
	        lt: new Date()
	      },
	      returned_on: null
	    },
	    include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(function(loans){
		res.render('all_loans', { loans: loans, title: 'Overdue Loans' });
	});
});

module.exports = router;