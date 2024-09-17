const express = require("express");
const router  = express.Router();
const fs = require("fs");

const db = require("../data/db");
const imageUpload = require("../helpers/image-upload");

router.get("/blog/delete/:blogid", async function (req, res) {

    const blogid = req.params.blogid;

    try {
    const [blogs, ] = await db.execute("SELECT * FROM blog Where blogid=?",[blogid]);
    const blog = blogs[0]; 
    res.render("admin/blog-delete",{
        title:"delete blog",
        blog : blog,
        
    });   
    } catch (err) {
        console.log(err);
    }
    
});//admin  blog get delete
router.get("/category/delete/:categoryid", async function (req, res) {

    const categoryid = req.params.categoryid;

    try {
    const [categories, ] = await db.execute("SELECT * FROM category Where categoryid=?",[categoryid]);
    const category = categories[0]; 
    res.render("admin/category-delete",{
        title:"delete blog",
        category : category,
        
    });   
    } catch (err) {
        console.log(err);
    }
    
});//admin category get delete
router.post("/blog/delete/:blogid",async function (req, res) {
    const blogid= req.body.blogid;
    try {
        await db.execute("DELETE FROM blog WHERE blogid=?",[blogid]);
        res.redirect("/admin/blogs?action=delete&blogid="+blogid)

        
    } catch (err) {
        console.log(err);
    }
    
});//admin blog post delete
router.post("/category/delete/:categoryid",async function (req, res) {
    const categoryid= req.body.categoryid;
    try {
        await db.execute("DELETE FROM category WHERE categoryid=?",[categoryid]);
        res.redirect("/admin/categories?action=delete&categoryid="+categoryid)

        
    } catch (err) {
        console.log(err);
    }
    
});//admin category post delete



router.get("/blog/create", async function(req, res) {
    try {

        const [categories, ] = await db.execute("select * from category");
        res.render("admin/blog-create",{
            title:"Tüm Kurslar",
            categories:categories,
        });  
    } catch (err) {
        console.log(err);
    }
}); ///admin blog create sayfası get
router.get("/category/create", async function(req, res) {
    try {

        res.render("admin/category-create",{
            title:"Category Create",
        });  
    } catch (err) {
        console.log(err);
    }
}); ///admin category create sayfası get
     

router.post("/blog/create",imageUpload.upload.single("resim"),  async function (req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const kategori = req.body.kategori;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;
    const onay = req.body.onay == "on" ? 1:0;
    try {
        await db.execute("INSERT INTO blog (blogtitle,altbaslik,blogdetail,resim,categoryid,anasayfa,onay) VALUES (?,?,?,?,?,?,?)", [baslik,altbaslik,aciklama,resim,kategori,anasayfa,onay]);
        res.redirect("/admin/blogs?action=create");


    } catch (err) {
        console.log(err);
    }
}); ///admin blog create sayfası post
router.post("/category/create",  async function (req, res) {
    const categoryname = req.body.categoryname;
    try {
        await db.execute("INSERT INTO category (categoryname) VALUES (?)", [categoryname]);
        res.redirect("/admin/categories?action=create");


    } catch (err) {
        console.log(err);
    }
}); ///admin category create sayfası post





router.get("/blogs/:blogid", async function(req, res) {

    const blogid = req.params.blogid;

    try {
        const [blogs, ]= await db.execute("select * from blog where blogid= ?",[blogid]);
        const [categories, ] = await db.execute("select * from category");
        const blog = blogs[0];
        if(blog){
            return res.render("admin/blog-edit",{
                title:"blog.baslik",
                blog :blog,
                categories: categories,
    
    
            });
        }
        res.redirect("/admin/blogs");
    } catch (err) {
        console.log(err);
    }
});//hazır blog detaili getirme
router.get("/categories/:categoryid", async function(req, res) {

    const categoryid = req.params.categoryid;

    try {
        const [categories, ]= await db.execute("select * from category where categoryid= ?",[categoryid]);
        const category = categories[0];
        if(category){
            res.render("admin/category-edit",{
                title:"Category edit",
                categories: category,
    
    
            });
        }
        res.redirect("/admin/categories");
    } catch (err) {
        console.log(err);
    }
});//hazır category detaili getirme

router.post("/blogs/:blogid", imageUpload.upload.single("resim"), async function (req, res) {
        const blogid= req.body.blogid;
        const baslik= req.body.baslik;
        const altbaslik= req.body.altbaslik;
        const aciklama= req.body.aciklama;
        let resim= req.body.resim;
        if(req.file){
            resim = req.file.filename;
            fs.unlink("./public/images/" + req.body.resim, err => {
                console.log(err);
            });
        }
        const anasayfa= req.body.anasayfa == "on" ? 1:0;       
        const onay= req.body.onay == "on" ? 1:0;  
        const kategori =req.body.kategori;
    try {
        await  db.execute("UPDATE blog SET blogtitle=?,altbaslik=?,blogdetail=?,resim=?,anasayfa=?,onay=?,categoryid=? WHERE blogid=?",[baslik,altbaslik,aciklama,resim,anasayfa,onay,kategori,blogid]);
        res.redirect("/admin/blogs?action=edit&blogid="+blogid);
    } catch (err) {
        console.log(err);
    }
})//blog güncelleme post
router.post("/categories/:categoryid", async function (req, res) {
    const categoryid= req.body.categoryid;
    const categoryname= req.body.categoryname;
try {
    await  db.execute("UPDATE category SET categoryname=? WHERE categoryid=?",[categoryname,categoryid]);
    res.redirect("/admin/categories?action=edit&categoryid="+categoryid);
} catch (err) {
    console.log(err);
}
})//category güncelleme post






router.get("/blogs", async function(req, res) {
    try {
        const [blogs, ]= await db.execute("SELECT blogid,blogtitle,resim from blog ");
        
        res.render("admin/blog-list",{
            title:"Blog List",
            blogs:blogs,
            action:req.query.action,
            blogid:req.query.blogid
        });
        
    } catch (err) {
        console.log(err);
    }
});// admin blog listesi

router.get("/categories", async function(req, res) {
    try {
        const [categories, ]= await db.execute("SELECT categoryid,categoryname from category ");
        res.render("admin/category-list",{
            title:"Category List",
            categories:categories,
            action:req.query.action,
            categoryid: req.query.categoryid
        });
        
    } catch (err) {
        console.log(err);
    }
});// category list

module.exports = router;