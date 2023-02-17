const { model } = require("mongoose");
const Blog  = require("../models/Blog")

class BlogService {

    static async getAllBlogs() {
        try {
            const blogs = await Blog.find().populate([{
                path: "comments likes",
                populate: {
                    path: "user",
                    model: "User",
                  select: "email names"
                }

            }]);
            
            return blogs;
        } catch (error) {
            throw new Error(error)
        }
    }


    static async getSingleBlog(id) {
        try {
            const blg = await Blog.findById(id) 
            return blg;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async updateSingleBlog(id) {
        try {
            const blg = await Blog.findById(id)
            return blg;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteSingleBlog(_id) {
        try {
            const blog = await Blog.deleteOne({
                _id
            })
            return blog;
        } catch (error) {
            throw new Error(error)
        }
    }

}

module.exports = BlogService;