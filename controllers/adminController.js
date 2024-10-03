const exp = require("constants");
const Blog = require("../models/blog");
const Category = require("../models/category");
const fs = require("fs");
const { Op, Sequelize, where } = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");
const Role = require("../models/role");
const User = require("../models/user");
const { title } = require("process");
const e = require("express");
/// DELETE
exports.blog_get_delete = async function (req, res) {

    const blogid = req.params.blogid;

    try {
        const blog = await Blog.findByPk(blogid);
        if(blog){

                return res.render("admin/blog-delete",{
                    title:"Delete Alert",
                    blog : blog
                }); 
        }
        res.redirect("/admin/blogs");
    } catch (err) { 
        console.log(err);
    }
    
}
exports.blog_post_delete = async function (req, res) {
    const blogid= req.body.blogid;
    try {
        await Blog.destroy({
            where: {
                id : blogid
            }
        });
        return  res.redirect("/admin/blogs?action=delete&blogid="+blogid)

        
    } catch (err) {
        console.log(err);
    }
    
}
exports.category_get_delete = async function (req, res) {

    const categoryid = req.params.categoryid;

    try {
    const category = await Category.findByPk(categoryid);
    res.render("admin/category-delete",{
        title:"delete blog",
        category : category,
        
    });   
    } catch (err) {
        console.log(err);
    }
    
}
exports.category_post_delete = async function (req, res) {
    const categoryid= req.body.categoryid;
    try {
        await Category.destroy({
            where: {
                id: categoryid
            }
        });
        res.redirect("/admin/categories?action=delete&categoryid="+categoryid)

        
    } catch (err) {
        console.log(err);
    }
    
}
///CREATE
exports.blog_get_create = async function(req, res) {
    try {

        const categories = await Category.findAll();
        res.render("admin/blog-create",{
            title:"Tüm Kurslar",
            categories:categories,
        });  
    } catch (err) {
        console.log(err);
    }
}
exports.blog_post_create =  async function (req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;
    const onay = req.body.onay == "on" ? 1:0;
    try {
        await Blog.create({
            blogtitle: baslik,
            url:slugField(baslik),
            altbaslik: altbaslik,
            blogdetail: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay,
        });
        res.redirect("/admin/blogs?action=create");


    } catch (err) {
        console.log(err);
    }
}
exports.category_get_create =  async function(req, res) {
    try {

        res.render("admin/category-create",{
            title:"Category Create",
        });  
    } catch (err) {
        console.log(err);
    }
}
exports.category_post_create = async function (req, res) {
    const categoryname = req.body.categoryname;
    try {
        await Category.create({categoryname: categoryname});
        res.redirect("/admin/categories?action=create");


    } catch (err) {
        console.log(err);
    }
}
///UPDATE
exports.blog_get_update = async function(req, res) {

    const blogid = req.params.blogid;

    try {
        const blog= await Blog.findOne({
            where:{
                id:blogid
            },
            include:{
                model:Category,
                attributes:["id"]
            }
        });
        const categories = await Category.findAll();
        if(blog){
            return res.render("admin/blog-edit",{
                title: blog.dataValues.blogtitle,
                blog : blog,
                categories: categories,
    
    
            });
        }
        res.redirect("/admin/blogs");
    } catch (err) {
        console.log(err);
    }
}
exports.category_get_update = async function(req, res) {

    const categoryid = req.params.categoryid;
    
    try {
        
        const category = await Category.findByPk(categoryid);
        const blogs = await category.getBlogs();
        countBlog = await category.countBlogs();
        if(category){
            res.render("admin/category-edit",{
                title:category.dataValues.categoryname,
                categories: category.dataValues,
                blogs: blogs,
                countBlog : countBlog
    
    
            });
        }
        res.redirect("/admin/categories");
    } catch (err) {
        console.log(err);
    }
}
exports.get_category_remove = async function (req, res) {
    const blogid = req.body.blogid;
    const categoryid = req.body.categoryid;

    await sequelize.query(`delete from blogCategories  where blogId=${blogid} and categoryId=${categoryid}`);
    res.redirect("/admin/categories/"+ categoryid);
}
exports.blog_post_update =  async function (req, res) {
    const blogid= req.body.blogid;
    const baslik= req.body.baslik;
    const altbaslik= req.body.altbaslik;
    const aciklama= req.body.aciklama;
    let resim= req.body.resim;
    const categoryIds = req.body.categories;
    const url = req.body.url;
    if(req.file){
        resim = req.file.filename;
        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        });
    }
    const anasayfa= req.body.anasayfa == "on" ? 1:0;       
    const onay= req.body.onay == "on" ? 1:0;  
try {
    const blog= await Blog.findOne({
        where:{
            id:blogid
        },
        include:{
            model:Category,
            attributes:["id"]
        }
    });
    await  Blog.update({
        blogtitle: baslik,
        altbaslik: altbaslik,
        blogdetail:aciklama,
        resim: resim,
        anasayfa: anasayfa,
        onay: onay,
        url:url

        
    },
    {
        where: {id: blogid},
    });

        if(categoryIds == undefined) {
            await blog.removeCategories(blog.categories);
        }else{
            await  blog.removeCategories(blog.categories);
            const selectedCategories = await Category.findAll({
                where:{
                        id:{
                            [Op.in] :categoryIds,
                        }
                }
            })
            await blog.addCategories(selectedCategories);
        }
    return res.redirect("/admin/blogs?action=edit&blogid="+blogid);
} catch (err) {
    console.log(err);
}
}
exports.category_post_update = async function (req, res) {
    const categoryid= req.body.categoryid;
    const categoryname= req.body.categoryname;
try {
    await  Category.update(
        {categoryname: categoryname},
    {
        where:{
            id: categoryid
        }
    });
    return res.redirect("/admin/categories?action=edit&categoryid="+categoryid);
} catch (err) {
    console.log(err);
}
}
///BLOGS
exports.admin_blogs = async function(req, res) {
    try {
        const blogs= await Blog.findAll({
            attributes:["id","blogtitle","altbaslik","resim"],
            include : [
                {
                  model: Category,
                  attributes: ['categoryname'] // Sadece categoryname çekiliyor
                }
              ]
            
    });
        
        res.render("admin/blog-list",{
            title:"Blog List",
            blogs:blogs,
            action:req.query.action,
            blogid:req.query.blogid
        });
        
    } catch (err) {
        console.log(err);
    }
}
exports.admin_categories = async function(req, res) {
    try {
        const categories= await Category.findAll();

        res.render("admin/category-list",{
            title:"Category List",
            categories:categories,
            action:req.query.action,
            categoryid: req.query.categoryid
        });
        
    } catch (err) {
        console.log(err);
    }
}
//ROLES
exports.get_roles = async function(req, res) {
    try {
        const roles = await Role.findAll({
            attributes:{
                include:[`role.id`,`role.rolename`,[sequelize.fn(`COUNT`,Sequelize.col(`users.id`)), `user_count`]]
            },
            include:[
                {model:User,attributes:["id"]}
            ],
            group:[`role.id`],
            raw:true,
            includeIgnoreAttributes: false
        })  


        res.render("admin/role-list",{
            title:"Role List",
            roles: roles
        });
        
    } catch (err) {
        console.log(err);
    }
}
exports.get_role_edit = async function(req, res) {
    const roleid = req.params.roleid;
    try {
        const role = await Role.findByPk(roleid);
        const users = await role.getUsers();
        if (role) {
            return res.render("admin/role-edit",{
                title:"Role Edit",
                role:role,
                users:users
            });
        }


        res.render("admin/role-list",{
            title:"Role List",
            
        });
        
    } catch (err) {
        console.log(err);
    }
}
exports.post_role_edit = async function(req, res) {
    const roleid = req.body.roleid;
    const rolename = req.body.rolename;
    try {
        await Role.update({rolename : rolename},{where: {id : roleid}});
        return res.redirect("/admin/roles");
        
    } catch (err) {
        console.log(err);
    }
}
exports.roles_remove = async function(req, res) {
    const roleid = req.body.roleid;
    const userid = req.body.userid;
    try {
        await sequelize.query(`delete from userRoles where userId=${userid} and roleId=${roleid}`);
        return res.redirect("/admin/roles/"+roleid);
        
    } catch (err) {
        console.log(err);
    }
}
exports.get_users = async function(req, res) {

    try {
        const users = await User.findAll({
            attributes:["id","fullname","email"],
            include:{
                model:Role,
                attributes:["rolename"]
            }
        });
        res.render("admin/user-list",{
            title:"User List",
            users:users
        })
       
        
    } catch (err) {
        console.log(err);
    }
}
exports.get_user_edit = async function(req, res) {
    const userid= req.params.userid;
    try {
        const user = await User.findOne({
            where:{id:userid},
            include:{model:Role,
            attributes:["id"]
        }});
        const roles = await Role.findAll();

        res.render("admin/user-edit",{
            title:"User Edit",
            user:user,
            roles:roles
        })
        
    } catch (err) {
        console.log(err);
    }
}
exports.post_user_edit = async function(req, res) {
    const userid= req.body.userid;
    const fullname= req.body.fullname;
    const email= req.body.email;
    const roleIds= req.body.roles;
    try {
        const user = await User.findOne({
            where:{id:userid},
            include:{model:Role, attributes:["id"]
        }});
        if (user) {
            user.fullname = fullname;
            user.email = email;
            
            if (roleIds == undefined) {
                await user.removeRoles(user.roles);
            }else{
                await user.removeRoles(user.roles);
                const selectedRoles = await Role.findAll({
                    where: {
                        id:{
                            [Op.in]: roleIds
                        }
                    }
                
                });
                await user.addRoles(selectedRoles);

            }
            await user.save();
            return res.redirect("/admin/users");
        }
        return res.redirect("/admin/users");
        
    } catch (err) {
        console.log(err);
    }
}