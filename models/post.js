const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');


class post extends Model {}

post.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        contents: {
            type: Datatypes.STRING
        },
        date_created: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW,
        },
        username:{
            type: Datatypes.STRING,
            refernces:{
                model: 'users',
                key: 'username',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = post;