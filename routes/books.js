var express = require('express');
var router = express.Router();

/* GET books page. */
router.get('/all_books', function(req, res, next) {
  res.render('all_books', { title: 'Books' });
});

router.get('/book_detail', function(req, res, next) {
  res.render('book_detail', { title: 'Test' });
});

router.get('/checked_books', function(req, res, next) {
  res.render('checked_books', { title: 'Test' });
});

router.get('/new_book', function(req, res, next) {
  res.render('new_book', { title: 'Test' });
});

router.get('/overdue_books', function(req, res, next) {
  res.render('overdue_books', { title: 'Test' });
});

router.get('/return_book', function(req, res, next) {
  res.render('return_book', { title: 'Test' });
});

module.exports = router;
