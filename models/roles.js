'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here
  };
  return Roles;
};