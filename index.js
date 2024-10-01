const express = require("express");
const cookieParser= require("cookie-parser");
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


//template engine
app.set("view engine","ejs");

console.log(app.get("view engine"));
//node modules
const path = require("path");
//custom modules
const sequelize =require("./data/db");
const dummyData =require("./data/dummy-data");
const locals = require("./middlewares/local");


//routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
//models
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
//middle ware
app.use(express.urlencoded({ extended: false }));
// app.use(function(req, res, next){
//     res.locals.isAuth = req.session.isAuth;
//     res.locals.fullname = req.session.fullname;
//     next();
// });

app.use(cookieParser());   
app.use(session({
    secret:"Hello world",
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: new SequelizeStore({
        db:sequelize
    })
}
));
app.use(locals);


app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/admin",adminRoutes);
app.use("/account",authRoutes);
app.use(userRoutes);


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