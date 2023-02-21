const bcrypt = require("bcrypt");
const User  = require("../models/User");
const jwt = require("jsonwebtoken");

class PublicController {
    static async PublicLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ msg: "Please add all required inputs", error: "" })
            }

            const doesExist = await  User.findOne({email});

            if (!doesExist) {
                return res.status(400).json({ msg: "User doesn't exist", error: "" })
            }

            const isValid = await bcrypt.compare(password, doesExist.password);
            if(!isValid){
                return res.status(400).json({msg:"Invalid password"})
            }
        
            const token = jwt.sign({ id: doesExist._id }, process.env.PUBLIC_SECRET,{expiresIn: 3600})
            return res.status(200).json({ msg: "Logged in succesfully", token })

        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = PublicController;