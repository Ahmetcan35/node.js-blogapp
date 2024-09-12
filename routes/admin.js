const express = require("express");
const router  = express.Router();

const db = require("../data/db");



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
}); ///admin create sayfası
router.post("/blog/create",  async function (req, res) {
    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const resim = req.body.resim;
    const kategori = req.body.kategori;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;
    const onay = req.body.onay == "on" ? 1:0;
    try {
        await db.execute("INSERT INTO blog (blogtitle,blogdetail,resim,categoryid,anasayfa,onay) VALUES (?,?,?,?,?,?)", [baslik,aciklama,resim,kategori,anasayfa,onay]);
        res.redirect("/admin/blogs");


    } catch (err) {
        console.log(err);
    }
}); ///admin create sayfası

router.get("/blogs/:blogid", async function(req, res) {

    const blogid = req.params.blogid;

    try {
        const [blogs, ]= await db.execute("select * from blog where blogid= ?",[blogid]);
        const [categories, ] = await db.execute("select * from category");
        const blog = blogs[0];
        if(blog){
            res.render("admin/blog-edit",{
                title:"blog.baslik",
                blog :blog,
                categories: categories,
    
    
            });
        }
        res.redirect("/admin/blogs");
    } catch (err) {
        console.log(err);
    }
});

router.get("/category/create", function(req, res) {
    res.render("admin/blog-listasd");
});
router.get("/category", function(req, res) {
    res.render("admin/blog-listsa");
});
router.get("/blogs", async function(req, res) {
    try {
        const [blogs, ]= await db.execute("SELECT blogid,blogtitle,resim from blog ");
        
        res.render("admin/blog-list",{
            title:"Blog List",
            blogs:blogs
        });
        
    } catch (err) {
        console.log(err);
    }
});// admin blog listesi


module.exports = router;