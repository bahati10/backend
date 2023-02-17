const BlogService = require("../services/blogService");
const { deleteSingle } = require("./messageController");


class BlogController {
    static async getBlogs(req, res) {
        try {
            const blogs = await BlogService.getAllBlogs();
            return res.status(200).json({ msg: "Blogs retrieved", data: blogs })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async getSingle(req, res) {
        try {
            const { id } = req.params;
            const user = await BlogService.getSingleBlog(id);
            if (!user) {
                return res.status(404).json({ msg: "Blog not found", error: "" })
            }
            return res.status(200).json({ msg: "User retrieved", data: user })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async deleteSingle(req, res) {
        try {
            const { id } = req.params;
            const blog = await BlogService.deleteSingleBlog(id);
            return res.status(200).json({ msg: "Blog deleted successfully" })
        } catch (error) {
            
        }
    }

    static async updateSingle(req, res) {
        try {
            const { id } = req.params;
            const blg = await BlogService.updateSingleBlog(id)
            if (req.body.title) {
                blg.title = req.body.title
            }

            if (req.body.subtitle) {
                blg.subtitle = req.body.subtitle
            }

            if (req.body.content) {
                blg.content = req.body.content
            }

            await blg.save()
            res.send(blg)
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }
}

module.exports = BlogController;