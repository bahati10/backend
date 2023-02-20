const Comment = require("../models/Like")

class LikeService{

    static async removeSingleLike(_id) {
        try {
            const like = await Comment.deleteOne({
                _id
            })
            return like;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = LikeService;