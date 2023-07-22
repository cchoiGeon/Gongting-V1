const Sequelize = require('sequelize')

class FriendProfile extends Sequelize.Model {
    static initiate(sequelize){
        FriendProfile.init({
            email : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            sex : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            age : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            smoke: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            major : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            mbti : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            hobby:{
                type: Sequelize.TEXT,
                allowNull: false,
            },
            ismatched:{
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: 'X',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'FriendProfile',
            tableName: 'friendprofiles',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = FriendProfile;