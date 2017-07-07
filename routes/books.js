var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET books page. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [['id', 'DESC']]}).then(function(books){
    res.render('all_books', {books: books, title: 'Books' });
  });
});

router.get('/book_detail', function(req, res, next) {
  res.render('book_detail', { title: 'Test' });
});

router.get('/checked_books', function(req, res, next) {
  res.render('checked_books', { title: 'Checked Out Books' });
});

/* POST create book. */
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect('/books');
  });
});

/* Create a new book form. */
router.get('/new_book', function(req, res, next) {
  res.render('new_book', { book: Book.build(), title: 'New Book' });
});

router.get('/overdue_books', function(req, res, next) {
  res.render('overdue_books', { title: 'Test' });
});

router.get('/return_book', function(req, res, next) {
  res.render('return_book', { title: 'Test' });
});

module.exports = router;
