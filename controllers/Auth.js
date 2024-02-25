const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// signup route handler
exports.signup = async (req, res) => {
    try {
        // fetch data 
        const { name, email, password, role } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User alraedy exited"
            })
        }
        // secure Password
        let hashedPassword
        try {
            // const saltRound = 10
            // hashedemail = await bcrypt.hash(email,10)
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "error in hashing Password"
            });

        }
        // create entry for user
        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        res.status(200).json({
            success: true,
            message: "User created Successfuly"
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be regesterd "
        })
    }
}

// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all message carefuly"
            })
        }
        // check for register user
        let user = await User.findOne({ email })
        // if not a register user
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "please create an new account"
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }
        // verify password & generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            // password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                })
            user = user.toObject();
            user.token = token
            user.password = undefined
            const options = {
                expires: new Date(Date.now() + 24*60* 3000),
                httpOnly: true, 
            }

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in Successfully"
            })
            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:"User Logged in Successfully"
            // })
        }
        else {
            // password dont match
            res.status(403).json({
                success: false,
                message: "password incorrect"
            })
        }
    } catch (error) {
        console.log(error);
    }
}  