const bcrypt = require("bcrypt");
const Admin  = require("../models/Admin");
const jwt = require("jsonwebtoken");
class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ msg: "Please add all required inputs", error: "" })
            }

            const doesExist = await  Admin.findOne({email});

            if (!doesExist) {
                return res.status(400).json({ msg: "User doesn't exist", error: "" })
            }

            const isValid = await bcrypt.compare(password, doesExist.password);
            if(!isValid){
                return res.status(400).json({error:"Invalid password"})
            }
        
            const token = jwt.sign({ id: doesExist._id }, process.env.TOKEN_SECRET,{expiresIn: 3600})
            return res.status(200).json({ msg: "Logged in succesfully", token })

        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AuthController;