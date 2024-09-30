const express = require("express");
const router  = express.Router();
const userController = require("../controllers/userController");

router.get("/blogs/category/:slug",userController.blog_list);

router.get("/blogs/:slug", userController.blog_details);

router.get("/blogs", userController.blog_list);

router.get("/", userController.home_list);

module.exports = router;