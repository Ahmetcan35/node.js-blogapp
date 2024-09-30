const express = require("express");

const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));   
console.log(app.get("view engine"));

const path = require("path");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");




app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/admin",adminRoutes);
app.use(userRoutes);

const sequelize =require("./data/db");
const dummyData =require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");

// İlişkiler
Blog.belongsToMany(Category,{through: "blogCategories"});
Category.belongsToMany(Blog,{through: "blogCategories"});


// İlişki tipinin uygulanması
//IFIE
(async () => {
    await sequelize.sync({force: true});
    await dummyData();
})();



app.listen(3000, function() {
    console.log("listening on port 3000");

});