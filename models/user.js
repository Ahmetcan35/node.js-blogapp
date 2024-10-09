const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../data/db");

const User =sequelize.define("user",{
    
    fullname: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg:"Ad Soyad girmelisiniz."
            }, 
            isFullname(value){
                if (value.split(" ").length < 2 ) {
                    throw new Error("Ad Soyad bilgisi giriniz.");
                }
            }
        }
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique:{
            args:true,
            msg:"Email daha önce alınmış."
        },
        validate:{
            notEmpty:{
                msg:"Email girmelisiniz."
            },
            isEmail:{
                msg:"Email olmalıdır."
            }}

    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg:"Parola girmelisiniz.",
            }
        }
    },
    resetToken: {
        type:DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration: {
        type:DataTypes.DATE,
        allowNull: true
    },
},
{timestamps:true});

User.afterValidate(async (user)=> {
    user.password = await bcrypt.hash(user.password, 10);
    
});
module.exports= User;