const LikeService = require("../services/likeService")
const Blog = require("../models/Blog")

class likeController{

static async deleteSingle(req, res) {
    try {
        const { id } = req.params;
        const c = await LikeService.removeSingleLike(id);
        return res.status(200).json({ msg: "like deleted successfully" })

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error })
    }
}
}

module.exports = likeController;