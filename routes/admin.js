const express = require("express");
const router  = express.Router();
const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth"); 
const csrf = require("../middlewares/csrf");

const Blog = require("../models/blog");
const Category = require("../models/category");
const { BLOB } = require("sequelize");

const adminController = require("../controllers/adminController");

router.get("/blog/delete/:blogid",isAuth,csrf, adminController.blog_get_delete);//admin  blog get delete
router.get("/category/delete/:categoryid",csrf,isAuth, adminController.category_get_delete);//admin category get delete
router.post("/blog/delete/:blogid",isAuth,adminController.blog_post_delete);//admin blog post delete
router.post("/category/delete/:categoryid",isAuth,adminController.category_post_delete);//admin category post delete

router.get("/blog/create",isAuth,csrf, adminController.blog_get_create); ///admin blog create sayfası get
router.get("/category/create",isAuth,csrf, adminController.category_get_create); ///admin category create sayfası get
router.post("/blog/create",isAuth, imageUpload.upload.single("resim"),adminController.blog_post_create); ///admin blog create sayfası post
router.post("/category/create",isAuth,  adminController.category_post_create); ///admin category create sayfası post

router.get("/blogs/:blogid",isAuth,csrf,  adminController.blog_get_update);//hazır blog detaili getirme
router.get("/categories/:categoryid",isAuth,csrf,  adminController.category_get_update);//hazır category detaili getirme
router.post("/blogs/:blogid",isAuth, imageUpload.upload.single("resim"),adminController.blog_post_update)//blog güncelleme post
router.post("/categories/:categoryid",isAuth, adminController.category_post_update)//category güncelleme post

router.post("/categories/remove",isAuth,adminController.get_category_remove);//category  blog ilikişi kaldırma

router.get("/blogs",isAuth,adminController.admin_blogs);// admin blog listesi
router.get("/categories",isAuth, adminController.admin_categories);// category list

module.exports = router;

