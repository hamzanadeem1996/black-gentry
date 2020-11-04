'use strict';
module.exports = (sequelize, Sequelize) => {
  const Peoples = sequelize.define('Peoples', {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    aboutme: {
      type: Sequelize.TEXT
    },
    dob: {
      allowNull: true,
      type: Sequelize.DATEONLY
    },
    gender: {
      type: Sequelize.STRING,
    },
    showmeto: {
      type: Sequelize.ENUM('Male', 'Female'),
      comment: 'Male Or Female '
    },
    interested: {
      type: Sequelize.ENUM('Men', 'Women', 'Both'),
      comment: 'Men , Women OR Both'
    },
    ethnicity: {
      type: Sequelize.ENUM('Caucasian', 'Black', 'Hispanic', 'Indian', 'Middle Eastern', 'Native American', 'Asian', 'Mixed Race', 'Other'),
      comment: 'Caucasian, Black, Hispanic, Indian, Middle Eastern, Native American, Asian, Mixed Race, Other'
    },
    Kids: {
      type: Sequelize.ENUM('Don’t have any', 'Have and want more', 'Have and don’t want anymore', 'Don’t want any'),
      comment: 'Don’t have any, Have and want more, Have and don’t want anymore,Don’t want any'
    },
    height: {
      type: Sequelize.STRING
    },
    ZodiacSign: {
      type: Sequelize.STRING,
    },
    education: {
      type: Sequelize.ENUM('High school', 'Some college', 'Associates degree', 'Bachelors degree', 'Graduate degree', 'PhD/Post Doctoral degree'),
      comment: 'High school, Some college, Associates degree, Bachelors degree, Graduate degree, PhD/Post Doctoral degree'
    },
    school: {
      type: Sequelize.STRING
    },
    occupation: {
      type: Sequelize.STRING
    },
    Relegion: {
      type: Sequelize.ENUM('Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Spiritual', 'Other'),
      comment: 'Agnostic, Atheist, Buddhist,  Christian, Hindu, Jewish ,  Muslim, Spiritual, Other'
    },
    Political: {
      type: Sequelize.ENUM('Liberal', 'Conservative', 'Moderate', 'Apolitical'),
      comment: 'Liberal, Conservative, Moderate, Apolitical'
    },
    Drink: {
      type: Sequelize.ENUM('Never', 'Socially', 'Often'),
      comment: 'Never,Socially or Often'
    },
    Smoke: {
      type: Sequelize.ENUM('Never', 'Socially', 'Often'),
      comment: 'Never,Socially or Often'
    },
    Exercise: {
      type: Sequelize.ENUM('Sometimes', 'Often', 'Almost never'),
      comment: 'Sometimes, Often, Almost never'
    },
    lookingFor: {
      type: Sequelize.ENUM('Relationship', 'Marriage', 'Something Casual', 'Not Sure'),
      comment: 'Relationship,Marriage,Something Casual,Not Sure'
    },
    ambitions: {
      type: Sequelize.TEXT
    },
    pets: {
      type: Sequelize.ENUM('Yes', 'No'),
      comment: 'Yes or No'
    },
    City: {
      type: Sequelize.STRING
    },
    Question1: {
      type: Sequelize.TEXT
    },
    Answer1: {
      type: Sequelize.TEXT
    },
    Question2: {
      type: Sequelize.TEXT
    },
    Answer2: {
      type: Sequelize.TEXT
    },
    Question3: {
      type: Sequelize.TEXT
    },
    Answer3: {
      type: Sequelize.TEXT
    },
    longitude: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.STRING
    },
    distance: {
      type: Sequelize.INTEGER
    },
    maxAgePrefer: {
      type: Sequelize.INTEGER
    },
    minAgePrefer: {
      type: Sequelize.INTEGER
    },
    visible: {
      type: Sequelize.ENUM('True', 'False')
    },
    matchNotify: {
      type: Sequelize.ENUM('On', 'Off')
    },
    chatNotify: {
      type: Sequelize.ENUM('On', 'Off')
    },
    callReminder: {
      type: Sequelize.ENUM('On', 'Off')
    },
    expiredMatches: {
      type: Sequelize.ENUM('On', 'Off')
    },
    matchUpdates: {
      type: Sequelize.ENUM('On', 'Off')
    },
    completed: {
      type: Sequelize.DOUBLE
    },
    superLikesCount: {
      type: Sequelize.INTEGER
    },
    timeToken: {
      type: Sequelize.INTEGER
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
  }, {});
  Peoples.associate = function (models) {

    Peoples.hasMany(models.Answers, {
      foreignKey: 'matchId',
      targetKey: 'userId',
      as: 'AnswerForPeople'
    });

    // associations can be defined here
    Peoples.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'profileOfUser'
    });
  };
  return Peoples;
};