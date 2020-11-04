'use strict';
const bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const Reports = sequelize.define('Reports', {
    reportedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      reportedFor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      reason: {
        type: Sequelize.TEXT,
      },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
  }, {});
  Reports.associate = function(models) {

    Reports.belongsTo(models.Users, {
        foreignKey: 'reportedBy',
        targetKey: 'id',
        as: 'ReportByUser'
      });
  
      Reports.belongsTo(models.Users, {
        foreignKey: 'reportedFor',
        targetKey: 'id',
        as: 'ReportForUser'
      });

  };
  
  return Reports;
};