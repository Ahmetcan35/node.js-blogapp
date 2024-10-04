module.exports = (req, res ,next) => {
    if (!req.session.isAuth) {
        return res.redirect("/account/login?returnUrl="+ req.originalUrl); // = >admin/blogs
    }

    if (!req.session.roles.includes("admin")) {
        req.session.message = {text:"Yetkili bir kullanıcı ile giriş yapınız." ,class:"danger"};
        return res.redirect("/account/login?returnUrl="+ req.originalUrl);

        
    }
    next();
}