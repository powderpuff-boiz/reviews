const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model { }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    summary: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    body: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    recommend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reviewer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewer_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    response: {
      type: DataTypes.STRING,
      allowNull: true
    },
    helpfulness: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
    {
      sequelize,
      modelName: 'Review'
    });
  return Review;
}