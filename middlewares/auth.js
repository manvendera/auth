// auth ,isStudent isAdmin
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.auth = (req, res, next) => {
    try {
        console.log("body",req.body.token);
        console.log("cookie",req.cookies.token);
    console.log("header",req.header("Authorization"));
        // extract JWT token
        const token = req.body.token   || req.cookies.token || req.header("Authorization").replace("Bearer"," ")
        if (!token) {
            return res.status(500).json({
                sucess: false,
                message: "Token missing"
            })
        }
        // verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload);
           
            req.user = payload
        } catch (error) {
            return res.status(401).json({
                sucess: false,
                message: 'token is invalid'
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            sucess: false,
            message: 'something went wrong, while verifying the token'
        })
    }
}
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== 'Student') {
            return res.status(401).json({
                sucess: false,
                message: 'This is a protected route for student'
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            sucess: false,
            message: `user role can't matchning`
        })
    }

}
exports.isAdmin = (req,res,next) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(401).json({
                sucess: false,
                message: 'This is a protected route for student'
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            sucess: false,
            message: `user role can't matchning`
        })
    }
}