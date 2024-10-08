const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Blog = sequelize.define( "blog",{

    blogtitle:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    altbaslik:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    blogdetail:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    resim:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    anasayfa:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    onay:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    
  
},
{
  timestamps: true,
  validate:{
    checkValidationOnay(){
        if (this.anasayfa && !this.onay) {
            throw new Error("Anasayfaya aldığınız bloğu onaylamadınız.");
        }
    }
  }
}
);

module.exports= Blog;
