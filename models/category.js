const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Category = sequelize.define( "category",{

    categoryname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false,
    },
});


module.exports= Category;
