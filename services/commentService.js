const Comment = require("../models/Comment")

class CommentService{
    static async getAllComment() {
        try {
            const cmnt = await Comment.find();
            return cmnt;

        } catch (error) {
            throw new Error(error)
        }
    }

    static async getSingleComment(id) {
        try {
            const comment = await Comment.findById(id)
            return comment
        } catch (error) {
            throw new Error(error)
        }
    }


    static async deleteSingleComment(_id) {
        try {
            const cmnt = await Comment.deleteOne({
                _id
            })
            return cmnt;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = CommentService;