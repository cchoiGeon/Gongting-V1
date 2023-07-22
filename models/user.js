const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    static initiate(sequelize){
        User.init({
            name: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            email : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            password : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            studentnum: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            studentcard:{
                type: Sequelize.STRING(1),
                allowNull: true,
                defaultValue: 'X',
            },
            studentcardroot:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            statusmatch:{
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 3,
            },
            myprofile:{
                type: Sequelize.STRING(1),
                allowNull: true,
                defaultValue: 'X',
            }
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = User;