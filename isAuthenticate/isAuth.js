const jwt = require("jsonwebtoken")
const rutineModel = require("../db/schema")

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwToken
        console.log(token)

        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY)

        console.log(verifyToken)
        if (verifyToken) {
            console.log(verifyToken)
            const rootUser = await rutineModel.findOne({ id: verifyToken._id, "tokens.token": token })
            req.token = token
            req.rootUser = rootUser
            req.userId = rootUser._id
            next()
        } else {
            res.send("Authenticated user not defined")
        }


        // console.log(token)

    } catch (error) {
        console.error(error)
        res.status(404).send("invalid token")
    }
}
module.exports = isAuthenticated