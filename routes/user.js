const express = require("express");
const router  = express.Router();
const db = require("../data/db");

router.use("/blogs/category/:categoryid",async function(req, res) {
    const id = req.params.categoryid;
    try {
    const [blogs, ] = await db.execute("select * from blog WHERE categoryid = ?",[id]);
    const [categories, ] = await db.execute("select * from category");
    res.render("users/blogs",{
        blogs:blogs,
        title:categories[id-1].categoryname,
        categories:categories,
        selectedCategory : id,
        
});
console.log(title); 
    
} catch (err) {
    console.log(err);
}
    
});

router.use("/blogs/:blogid", async function(req, res) {

    const id = req.params.blogid;
    try {
        const [blog, ] =  await db.execute("select * from blog where blogid = ?",[id]);
        
        if(blog[0]){
            return res.render("users/blog-details",{
            title:blog[1].blogtitle,
            blog : blog[0],
        });}

        res.redirect("/");

            
    } catch (err) {
        console.log(err);
    }
    
});

router.use("/blogs", async function(req, res) {

    try {
        const [blogs, ] = await db.execute("select * from blog WHERE onay = 1");
        const [categories] = await db.execute("select * from category");
        res.render("users/blogs",{
            blogs:blogs,
            title:"Tüm  Kurslar",
            categories:categories,
            selectedCategory : null,

        });
        
    } catch (err) {
        console.log(err);
    }
    
});

router.use("/", async function(req, res) {

    try {
        const [blogs, ] = await db.execute("select * from blog WHERE onay = 1 And anasayfa =1");
        const [categories, ] = await db.execute("select * from category");
        res.render("users/index",{
            blogs:blogs,
            title:"Popüler Kurslar",
            categories:categories,
            selectedCategory : null,

        });
        
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = router;