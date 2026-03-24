'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autores extends Model {
    static associate(models) {
        Autores.hasMany(models.Books, {foreignKey: 'AuthorID',as: 'Books'});
    }
  }
  Autores.init({
    Name: DataTypes.STRING,
    Stack: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Autores',
  });
  return Autores;
};