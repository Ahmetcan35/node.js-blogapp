const express = require("express");
const router  = express.Router();
const userController = require("../controllers/userController");

router.use("/blogs/category/:categoryid",userController.blog_by_category);

router.use("/blogs/:blogid", userController.blog_details);

router.use("/blogs", userController.blog_list);

router.use("/", userController.home_list);

module.exports = router;