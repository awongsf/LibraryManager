'use strict';
var d = new Date();

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required.'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Author is required.'
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: 'Author field only accepts letters.'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Genre is required.'
        }, 
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: 'Genre field only accepts letters.'
        }
      }
    },
    first_published: {
      type: DataTypes.INTEGER,
      validate: {
        not: {
          args: ["[a-z]",'i'],
          msg: 'First Published must be a valid year.'
        },
        max: {
          args: [[d.getFullYear()]],
          msg: "This isn't Back To The Future. Please enter a publishing year no later than " + d.getFullYear() + "!"
        },
        min: {
          args: [[0]],
          msg: 'First Published must be a valid year.'
        }
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};