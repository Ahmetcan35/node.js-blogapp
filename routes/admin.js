const express = require("express");
const router  = express.Router();
const imageUpload = require("../helpers/image-upload");
const isAdmin = require("../middlewares/is-admin"); 
const csrf = require("../middlewares/csrf");

const Blog = require("../models/blog");
const Category = require("../models/category");
const { BLOB } = require("sequelize");

const adminController = require("../controllers/adminController");
const isModerator = require("../middlewares/is-moderator");

router.get("/blog/delete/:blogid",isModerator,csrf, adminController.blog_get_delete);//admin  blog get delete
router.get("/category/delete/:categoryid",csrf,isAdmin, adminController.category_get_delete);//admin category get delete
router.post("/blog/delete/:blogid",isModerator,adminController.blog_post_delete);//admin blog post delete
router.post("/category/delete/:categoryid",isAdmin,adminController.category_post_delete);//admin category post delete

router.get("/blog/create",isModerator,csrf, adminController.blog_get_create); ///admin blog create sayfası get
router.get("/category/create",isAdmin,csrf, adminController.category_get_create); ///admin category create sayfası get
router.post("/blog/create",isModerator,csrf, imageUpload.upload.single("resim"),adminController.blog_post_create); ///admin blog create sayfası post
router.post("/category/create",isAdmin,  adminController.category_post_create); ///admin category create sayfası post

router.get("/blogs/:blogid",isModerator,csrf,  adminController.blog_get_update);//hazır blog detaili getirme
router.get("/categories/:categoryid",isAdmin,csrf,  adminController.category_get_update);//hazır category detaili getirme
router.post("/blogs/:blogid",isModerator, imageUpload.upload.single("resim"),adminController.blog_post_update)//blog güncelleme post
router.post("/categories/:categoryid",isAdmin, adminController.category_post_update)//category güncelleme post

router.post("/categories/remove",isAdmin,adminController.get_category_remove);//category  blog ilikişi kaldırma

router.get("/blogs",isModerator,adminController.admin_blogs);// admin blog listesi
router.get("/categories",isAdmin, adminController.admin_categories);// category list

////////////////////////////////////////////////////////////////////////////////////////////////
////role
router.get("/roles",isAdmin,adminController.get_roles);//role list
router.get("/roles/:roleid",isAdmin,csrf,adminController.get_role_edit);//get role edit
router.post("/roles/remove",isAdmin,adminController.roles_remove);//role list
router.post("/roles/:roleid",isAdmin,adminController.post_role_edit);//post role edit
////////////////////////////////////////////////////////////////////////////////////////////////
////user
router.get("/users",isAdmin,adminController.get_users);//get role edit
router.get("/users/:userid",isAdmin,csrf,adminController.get_user_edit);//get role edit
router.post("/users/:userid",isAdmin,adminController.post_user_edit);//get role edit
module.exports = router;

