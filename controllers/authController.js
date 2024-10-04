const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { raw } = require("mysql2");

exports.get_register  = async function (req, res) {
    try {
        return res.render("auth/register",{
            title:"Register"
        })
    } catch (err) {
        console.log(err);
    }
    
}

exports.post_register = async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    try {
        const user = await User.findOne({where:{email:email}});
        if(user){
            req.session.message= {text: "Girdiğiniz email adresiyle daha önce bir kayıt oluşturulmuş.", class:"warning"};
            return res.redirect("login");
        }
        const newUser = await User.create({fullname : name,email: email,password: hashedPassword});

        emailService.sendMail({
            from: config.email.from, // sender address
            to: newUser.email, // list of receivers
            subject: "Hesabınız oluşturuldu.✔", // Subject line
            text: "Hesabınız başarılı bir şekilde oluşturuldu.", // plain text body
        })


        req.session.message = {text: "Hesabınıza giriş yapabilirsiniz.", class:"success"};
        return res.redirect("login");
    } catch (err) {
        console.log(err);
    }
    
}

exports.get_login  = async function (req, res) {
    const message = req.session.message;
    delete req.session.message;
    try {
        return res.render("auth/login",{
            title:"Login",
            message: message,
        })
    } catch (err) {
        console.log(err);
    }
    
}

exports.post_login  = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where:{
                email: email
            }
        });

        if (!user) {
            return res.render("auth/login",{
                title:"Login",
                message: {text: "Lütfen geçerli bir email giriniz.", class:"danger"}

            });          
        }
        //parola kontrolü

        const match= await bcrypt.compare(password, user.password );

        if(match) { 
            const userRoles = await user.getRoles({
                attributes:["rolename"],
                raw:true
            });
            req.session.roles= userRoles.map((role) => role["rolename"]);//admin//moderatör
            req.session.isAuth = true;
            req.session.fullname = user.fullname;
            req.session.userid = user.id;
            
            const url = req.query.returnUrl || "";
            return res.redirect(url);
        } 
        req.session.message= {text: "Yanlış bir parola girdiniz.", class:"danger"};
        return res.redirect("login");
        // return res.render("auth/login",{
        //     title:"Login",
        //     message: {text: "Girdiğiniz parola hatalı.", class:"danger"}

        // });   

    } catch (err) {
        console.log(err);
    }
    
}

exports.get_logout  = async function (req, res) {
    try {
        await req.session.destroy();
        return res.redirect("/account/login");
    } catch (err) {
        console.log(err);
    }
    
}

exports.get_reset  = async function (req, res) {
    try {
        return res.render("auth/reset-password",{
            title:"Reset password"
        })
    } catch (err) {
        console.log(err);
    }
    
}
exports.post_reset  = async function (req, res) {
    const email = req.body.email;
    try {
        var token = crypto.randomBytes(32).toString("hex");
        var user = await User.findOne({where:{email: email,}});
        if (!user) {
            req.session.message= {text: "Email bulunmadı.", class:"danger"};
            return res.redirect("reset-password");
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + (1000 * 60* 60);
        await user.save();

        emailService.sendMail({
            from: config.email.from, // sender address
            to: email, // list of receivers
            subject: "Reset-Password.", // Subject line
            html:`
            <p>Parolanızı güncellemek için aşağıdaki linke tıklayınız.</p>
            <p>
            <a href = "http://127.0.0.1:3000/account/new-password/${token}">Parola Sıfırlama</a>
            </p>
            `
        });

        req.session.message= {text: "Parolanızı sıfırlamak için eposta adresinizi kontrol ediniz.", class:"success"};
        return res.redirect("login");
        
    } catch (err) {
        console.log(err);
    }
    
}

exports.get_newPassword  = async function (req, res) {
    const token = req.params.token;
    try {
        const user = await User.findOne({
            where:{
                resetToken: token,
                resetTokenExpiration:{
                    [Op.gt]:Date.now()
                } 
            }
        })
        return res.render("auth/new-password",{
            title:"New password",
            token: token,
            userId: user.id
        })
    } catch (err) {
        console.log(err);
    }
    
}
exports.post_newPassword  = async function (req, res) {
    const token = req.body.token;
    const userId = req.body.userId;
    const newPassword = req.body.password;
    try {
        const user = await User.findOne({
            where:{
                resetToken: token,
                resetTokenExpiration:{
                    [Op.gt]:Date.now()
                } 
            },
            id:userId,
        });
        user.password = await bcrypt.hash(newPassword,10);
        user.resetToken= null;
        user.resetTokenExpiration= null;
        user.save();

        req.session.message= {text: "Parolanız başarılı bir şekilde değiştirilmiştir.", class:"success"};
        return res.redirect("login");
    } catch (err) {
        console.log(err);
    }
    
}