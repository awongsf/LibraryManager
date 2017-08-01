var express = require('express');
var router = express.Router();
var moment = require('moment');
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

/* POST create new loan. */
router.post('/', function(req, res, next) {
  Loan.create(req.body).then(function(loan) {
    res.redirect('/loans');
  });
});

/* Create a new loan form. */
router.get('/new_loan', function(req, res, next) {
	Book.findAll().then(function(books){
		Patron.findAll().then(function(patrons){
			res.render('new_loan', { 
				books: books, 
				patrons: patrons, 
				loaned_on: moment().format('YYYY-MM-DD'),
				return_by: moment().add('7', 'days').format('YYYY-MM-DD'),
				loan: Loan.build(),
				title: 'New Loan'
			});		
		});
	});
});

/* Return a Book via PUT Update Loan. */
router.put("/:id", function(req, res, next){
	Loan.findById(req.params.id).then(function(loan){
		return loan.update(req.body);
	}).then(function(loan){
		res.redirect("/loans");        
	})
});

module.exports = router;