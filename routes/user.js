const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const User = require('../models/usermodel');
const controller = require('../controllers/userControllers');
const AuthCheck = require('../auth-check/AuthCheck');


// User Registeration
router.post('/register', (req, res) => {
    controller.registeration(req, res);
});

//Login API
router.post('/login', (req, res) => {
    controller.login(req, res);
});

// protected route with the help of JWT
router.post('/get-details', AuthCheck, (req, res, next) => {
    res.status(200).json({
        msg:'token recieved'
    });
});

// router.post('/forgot-password', (req,res,next) =>{
//     controller.forgotPassword(req, res);
// });
module.exports = router;