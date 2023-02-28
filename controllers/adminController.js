const AdminService = require("../services/adminServices")


class AdminController {
    static async getAdmin(req, res) {
        try {
            const admin = await AdminService.getAllAdmins();
            return res.status(200).json({ msg: "Admin retrieved", data: admin })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }


    // static async deleteAdmin(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const ad = await AdminService.deleteSingleAdmin(id);
    //         return res.status(200).json({ msg: "Admin deleted successfully" })

    //     } catch (error) {
    //         return res.status(400).json({ msg: "Something went wrong", error })
    //     }
    // }
}

module.exports = AdminController;