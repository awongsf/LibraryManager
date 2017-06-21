var express = require('express');
var router = express.Router();

/* GET patrons page. */
router.get('/all_patrons', function(req, res, next) {
  res.render('all_patrons', { title: 'Patrons' });
});

module.exports = router;