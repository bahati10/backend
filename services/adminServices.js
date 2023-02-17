const Admin = require("../models/Admin");

class AdminService {
    static async getAllAdmins() {
        try {
            const admin = await Admin.find();
            return admin;

        } catch (error) {
            throw new Error(error)
        }
    }

    
    static async deleteAllAdmins(_id) {
        try {
            const admin = await Admin.deleteOne({
                _id
            })
            return admin;
        } catch (error) {
            throw new Error(error)
        }
    }
}


module.exports = AdminService;