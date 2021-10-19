const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model { }
  Photo.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Photo'
  });

  return Photo;
}