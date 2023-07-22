const Sequelize = require('sequelize')

class Result extends Sequelize.Model {
    static initiate(sequelize){
        Result.init({
            email : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            name :{
                type: Sequelize.TEXT,
                allowNull: false,
            },  
            sex : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            age: {
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
            hobby: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            features: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            socialmediaid:{
                type: Sequelize.TEXT,
                allowNull: false,
            },
            socialmediatype : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'Result',
            tableName: 'results',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = Result;