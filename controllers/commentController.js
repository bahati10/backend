const CommentService = require("../services/commentService")
const Blog = require("../models/Blog")

class CommentController {
    static async getComments(req, res) {
        try {
            const cmnts = await CommentService.getAllComment();
            return res.status(200).json({ msg: "Comments retrieved", data: cmnts })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async getSingle(req, res) {
        try {
            const { id } = req.params;
            const comment = await CommentService.getSingleComment(id);
            if (!comment) {
                return res.status(404).json({ msg: "Comment not found", error: "" })
            }
            return res.status(200).json({ msg: "Comment retrieved", data: comment })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async deleteSingle(req, res) {
        try {
            const { id } = req.params;
            const c = await CommentService.deleteSingleComment(id);
            return res.status(200).json({ msg: "Comment deleted successfully" })

        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }
}

module.exports = CommentController