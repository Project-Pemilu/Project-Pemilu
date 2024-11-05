'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    static associate(models) {
      Candidate.hasMany(models.User);
    }
  }
  Candidate.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name is required',
          },
          notNull: {
            msg: 'Name is required',
          },
        },
      },
      totalVote: DataTypes.INTEGER,
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Image Url is required',
          },
          notNull: {
            msg: 'Image Url is required',
          },
        },
      },
      motto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Motto is required',
          },
          notNull: {
            msg: 'Motto is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Candidate',
    }
  );
  return Candidate;
};
