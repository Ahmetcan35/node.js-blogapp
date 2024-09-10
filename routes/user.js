const express = require("express");
const router  = express.Router();
const db = require("../data/db");

const data ={

    title:"Popüler Kurslar",
    categories:["Tüm Programlar","Web Geliştirme","Python Programlama","Mobil Programlama","Veri Analizi"],
    blogs:[{
        blogid:1,
        blogtitle:"Komple Uygulamalı Web Geliştirme",
        blogdetail:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        resim:"1.jpeg",
        anasayfa:true,
    },
    {
        blogid:2,
        blogtitle:"Python ile Sıfırdan İleri Seviye Python Programlama",
        blogdetail:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        resim:"2.jpeg",
        anasayfa:true,
    },
    {
        blogid:3,
        blogtitle:"Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
        blogdetail:"Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
        resim:"3.jpeg",
        anasayfa:false,
    },{
        blogid:2,
        blogtitle:"Python ile Sıfırdan İleri Seviye Python Programlama",
        blogdetail:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        resim:"2.jpeg",
        anasayfa:true,
    },]
}

router.use("/blogs/:blogid", function(req, res) {
    res.render("users/blog-details");
});

router.use("/blogs", function(req, res) {
    db.execute("select * from blog")
    .then(result => {
        console.log(result[0]);
        res.render("users/blogs",{
            blogs:result[0],
            title:"Tüm Kurslar",
            categories:data.categories,

        });
    })
    .catch(err => console.log(err));
});

router.use("/", function(req, res) {
    db.execute("select * from blog")
    .then(result => {
        console.log(result[0]);
        res.render("users/index",{
            blogs:result[0],
            title:"Popüler Kurslar",
            categories:data.categories,

        });
    })
    .catch(err => console.log(err));
    
});

module.exports = router;