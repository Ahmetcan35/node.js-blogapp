const express = require("express");
const cookieParser= require("cookie-parser");
const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());   
console.log(app.get("view engine"));

const path = require("path");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");




app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/admin",adminRoutes);
app.use("/account",authRoutes);
app.use(userRoutes);

const sequelize =require("./data/db");
const dummyData =require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");

Blog.belongsTo(User);
User.hasMany(Blog);

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