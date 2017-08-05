'use strict';
module.exports = function(sequelize, DataTypes) {
  var Patron = sequelize.define('Patron', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First Name is required.'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last Name is required.'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Address is required.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is required.'
        },
        isEmail: {
          args: [true],
          msg: 'Please enter a valid email.'
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Library ID is required.'
        }
      }
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Zip Code is required.'
        },
        len: {
          args: [5],
          msg: 'Please enter a valid Zip Code.'
        }
      }
    },
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Patron;
};