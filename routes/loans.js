var express = require('express');
var router = express.Router();

/* GET loans page. */
router.get('/all_loans', function(req, res, next) {
  res.render('all_loans', { title: 'Loans' });
});

module.exports = router;