const Admin = require("../models/Admin");

class AdminService {
    static async getAllAdmins() {
            const admin = await Admin.find();
            return admin
    }

    
    // static async deleteSingleAdmin(_id) {
    //     try {
    //         const admin = await Admin.deleteOne({
    //             _id
    //         })
    //         return admin;
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
}


module.exports = AdminService;