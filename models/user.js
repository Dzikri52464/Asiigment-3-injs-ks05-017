'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helepers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo)
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: "this username has been used"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Username can't be empty!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: "this email has been used"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "email can't be empty!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      vailidate:{
        notEmpty:{
          args: true,
          msg: 'password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    }
  });
  return User;
};