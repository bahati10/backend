const User = require("../models/User")
class UserService {
    static async getUsers() {
        try {
            const usrs = await User.find()
            return usrs;

        } catch (error) {
            throw new Error(error)
        }
    }

    static async getSingleUser(id) {
        try {
            const usr = await User.findById(id);
            return usr;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteSingleUser(_id) {
        try {
            const usr = await User.deleteOne({
                _id
            })
            return usr;
        } catch (error) {
            throw new Error(error)
        }
    }


    static async updateSingleUser(id) {
        try {
            const user = await User.findById(id)
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }
}



module.exports = UserService