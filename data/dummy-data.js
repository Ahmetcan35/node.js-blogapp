const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");
const User = require("../models/user");
const bcrypt = require("bcrypt");
async function populate() {
   
    const count = await Blog.count();

    if(count == 0) { 

        const categories = await Category.bulkCreate([
            { categoryname: "Web Geliştirme" ,url:slugField("Web Geliştirme")},
            { categoryname: "Mobil Geliştirme" ,url:slugField("Mobil Geliştirme")},
            { categoryname: "Programlama" ,url:slugField("Programlama")}
        ]);

        const blogs = await Blog.bulkCreate([
            {
                blogtitle: "Komple Uygulamalı Web Geliştirme Eğitimi",
                url:slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
                altbaslik: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                blogdetail: "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
                resim: "1.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim: "2.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
                url:slugField("Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "Neden Javascript? Javascript son zamanlarda en popüler diller arasında yerini aldı hatta Javascript listenin en başında diyebiliriz. Peki son zamanlarda bu kadar popüler hale gelen Javascript nedir? Çoğu web geliştirici için Javascript sadece tarayıcıda yani client tarafında çalışan ve html içeriklerini hareketli hale getiren bir script dili olarak biliniyor.  Web sitemize eklediğimiz bir resim galerisi, bir butona tıkladığımızda bir pop-up kutusunun açılması gibi html içeriklerini hareketli hale getiren ve yıllardır kullandığımız programlama dili tabi ki Javascript. Bu yönüyle Javascript 'i yıllardır zaten kullanmaktayız. Ancak son zamanlarda Javascript' i bu kadar popüler yapan neden nedir?",
                resim: "4.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            } ,
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            },
            {
                blogtitle: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                blogdetail: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                resim: "5.jpeg",
                anasayfa: true,
                onay: true,
            }  



        ]);

        const users = await User.bulkCreate([
            {fullname:"Ahmetcan Çetin", email:"ahmetcancetinz@gmail.com", password: await bcrypt.hash("123456789",10)},
            {fullname:"Cengiz Çetin", email:"cengizcetinz@gmail.com", password: await bcrypt.hash("123456789",10)},
        ])
        await categories[0].addBlog(blogs[0]);
        await categories[0].addBlog(blogs[1]);
        await categories[0].addBlog(blogs[2]);
        await categories[0].addBlog(blogs[3]);
        await categories[0].addBlog(blogs[4]);
        await categories[0].addBlog(blogs[5]);
        await categories[0].addBlog(blogs[6]);
        await categories[0].addBlog(blogs[7]);
        await categories[0].addBlog(blogs[8]);
        await categories[0].addBlog(blogs[9]);
        await categories[0].addBlog(blogs[10]);
        await categories[0].addBlog(blogs[11]);
        await categories[1].addBlog(blogs[2]);
        await categories[1].addBlog(blogs[3]);
        await categories[2].addBlog(blogs[2]);
        await categories[2].addBlog(blogs[3]);

        
    }
    
    
}
module.exports = populate;