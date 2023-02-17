const jwt = require("jsonwebtoken");
class PublicAuthMiddleware {
    static async checkAuthentication(req, res, next) {
        try {
            const token = req.headers["authorization"].split(" ")[1];
            console.log(req.headers)
            if (!token) {
                return res.status(400).json({ msg: "Please sign in!" })
            }
            const data = jwt.verify(token, process.env.PUBLIC_SECRET);
            if (!data) {
                return res.status(400).json({ msg: "Invalid token, Please sign in!" })
            }
            req.id = data.id;
            next()

        } catch (error) {
            return res.status(500).json({ msg: "Something went wrong, Invalid token" })
        }
    }

}

module.exports = PublicAuthMiddleware;