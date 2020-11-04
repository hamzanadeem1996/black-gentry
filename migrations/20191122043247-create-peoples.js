'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Peoples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        type: Sequelize.ENUM('Caucasian', 'Black', 'Hispanic', 'Indian','Middle Eastern', 'Native American', 'Asian', 'Mixed Race', 'Other'),
        comment: 'Caucasian, Black, Hispanic, Indian, Middle Eastern, Native American, Asian, Mixed Race, Other'
      },
      Kids: {
        type: Sequelize.ENUM('Don’t have any', 'Have and want more', 'Have and don’t want any more', 'Don’t want any'),
        comment: 'Don’t have any, Have and want more, Have and don’t want any more, Don’t want any'
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
        type: Sequelize.ENUM('Agnostic', 'Atheist', 'Buddhist',  'Christian', 'Hindu', 'Jewish' ,  'Muslim', 'Spiritual', 'Other'),
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
      // intent: {
      //   type: Sequelize.ENUM('Dating', 'Friendship'),
      //   comment: 'Dating OR Friendship'
      // },
      // graduation: {
      //   type: Sequelize.DATEONLY
      // },
      // Marital: {
      //   type: Sequelize.ENUM('Single', 'Married', 'Divorced', 'Widowed', 'Seperated'),
      //   comment: 'Single, Married, Divorced, Widowed, Seperated'
      // },
      ambitions: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      Question1: {
        type: Sequelize.TEXT
      },
      Question2: {
        type: Sequelize.TEXT
      },
      Question3: {
        type: Sequelize.TEXT
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Peoples');
  }
};