var express = require('express');
var router = express.Router();
var moment = require('moment');
var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

/* GET books page. */
router.get('/', function(req, res, next) {
	Book.findAll({
		order: [['id', 'DESC']],
	}).then(function(books){
		res.render('all_books', { books: books, title: 'Books' });
	});
});

/* GET Book Detail */
router.get('/book_detail/:id', function(req, res, next) {
	Book.findById(req.params.id).then(function(book){
		Loan.findAll({
			where: {
				book_id: book.id
			},
			include: [
				{
					model: Patron
				}
			]
		}).then(function(loans){
			res.render('book_detail', { book: book, loans: loans, title: book.title });
		});
	});
});

/* PUT Update Book. */
router.put("/:id", function(req, res, next){
	Book.findById(req.params.id).then(function(book){
		return book.update(req.body);
	}).then(function(book){
		res.redirect("/books");        
	})
});

/* GET Checked Out Books */
router.get('/checked_books', function(req, res, next) {
	Loan.findAll({
		where: {
			returned_on: null
		}
	}).then(function(loans){

		var checkedBooksID = loans.map(function(obj){return obj.dataValues.book_id});

		Book.findAll({
			where: {
				id: {
					in: checkedBooksID
				}
			}
		}).then(function(books){
			res.render('all_books', { books: books, title: 'Checked Out Books' });    
		})
	})
});

/* POST create book. */
router.post('/', function(req, res, next) {
	Book.create(req.body).then(function(book) {
		res.redirect('/books');
	}).catch(function(error){
		if (error.name === "SequelizeValidationError") {
			res.render('new_book', { book: Book.build(req.body), errors: error.errors, title: 'New Book'})
		} else {
			throw error;
		}
	}).catch(function(error){
		res.send(500, error);
	});
});

/* Create a new book form. */
router.get('/new_book', function(req, res, next) {
	res.render('new_book', { book: Book.build(), title: 'New Book' });
});

/* GET Overdue Books */
router.get('/overdue_books', function(req, res, next) {
	Loan.findAll({
		where: {
			return_by: {
				lt: new Date()
			},
			returned_on: null
		}
	}).then(function(loans){
		
		var overdueBooksID = loans.map(function(obj){return obj.dataValues.book_id});

		Book.findAll({
			where: {
				id: {
					in: overdueBooksID
				}
			}
		}).then(function(books){
			res.render('all_books', { books: books, title: 'Overdue Books' });
		});
	});
});

module.exports = router;
