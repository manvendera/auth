const express = require('express')
const route = express.Router()
const { auth, isStudent, isAdmin } = require('../middlewares/auth')
const { login, signup } = require('../controllers/Auth')

route.post('/login', login)
route.post('/signup', signup)

// Protected
// route.get('/auth',auth)
route.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: "wellcome to the test route"
    })
})
route.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "wellcome to the protected route for student "
    })
})
route.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "wellcome to the protected route for Admin"
    })
})


module.exports = route