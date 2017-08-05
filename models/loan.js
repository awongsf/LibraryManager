'use strict';
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please pick a book.'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please pick a patron.'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Please enter a Loaned On date.'
        },
        isDate: {
          args: [[true]],
          msg: 'Please enter a valid Loaned On date.'
        }
      }
    },
    return_by: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Please enter a Loaned On date.'
        },
        isDate: {
          args: [[true]],
          msg: 'Please enter a valid Return By date.'
        }
      }
    },
    returned_on: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Please enter a Returned On date.'
        },
        isDate: {
          args: [[true]],
          msg: 'Please enter a valid Returned On date.'
        }
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      formatDate: function(date) {
        return moment(date).format('YYYY-MM-DD');
      }
    }
  });
  return Loan;
};