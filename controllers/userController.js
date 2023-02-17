const UserService = require("../services/userService")
class UserController {
    static async getUsers(req, res) {
        try {
            const usrs = await UserService.getUsers();
            return res.status(200).json({ msg: "Users retrieved", data: usrs })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async getSingle(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getSingleUser(id);
            if (!user) {
                return res.status(404).json({ msg: "User not found", error: "" })
            }
            return res.status(200).json({ msg: "User Found", data: user })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async deleteSingle(req, res) {
        try {

            const { id } = req.params;
            const u = await UserService.deleteSingleUser(id)
            return res.status(200).json({ msg: "User removed successfully"})
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async updateSingle(req, res) {
        const addedDate = new Date();
        try {
            const { id } = req.params;
            const user = await UserService.updateSingleUser(id)
            if (req.body.names) {
                user.names = req.body.names
            }

            if (req.body.email) {
                user.email = req.body.email
            }
            if (req.body.password) {
                user.password = req.body.password
            }
            await user.save()
            return res.status(200).json({ msg: "User Updated Successfully", data: user })
        } catch (error) {
            res.status(404).json({ msg: "Something went wrong" })
        }
    }
}


module.exports = UserController;