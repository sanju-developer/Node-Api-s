const User = require('../models/usermodel');
const body_parser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/databse');
const nodemailer = require('nodemailer');

const registeration = async (req, res) => {
    try {
        // Create User Object
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        // Encrypt the password
        var hash = bcrypt.hashSync(req.body.password, 10);
        newUser.password = hash;

        if (await User.findOne({ email: req.body.email })) {
            res.status(402).json({
                msg: 'Email is already exist',
                status: 0
            });
        } else {
            const registereduser = await newUser.save();
            res.status(200).json({
                msg: 'user registered',
                response: registereduser,
                status: 1
            });
        }
    }
    catch (error) {
        res.status(402).json({
            msg: 'something went wrong',
            err: error
        });
    }
}

// Login API
const login = async (req, res) => {
    try {
        // check if user is already exist
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user && await bcrypt.compareSync(req.body.password, user.password)) {
                // generate jwt token
                const token = jwt.sign(
                    {
                         email:user.email,
                         userId:user._id 
                    },
                    db.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                res.status(200).json({
                    msg: 'you are logged in',
                    status: 1,
                    authtoken:token
                });
                } else {
                    res.status(401).json({
                        msg: 'Please enter a valid credentials',
                        status: 0
                    });
                }
                } else {
                    // if user is not registered
                    res.status(400).json({
                        msg: 'User is not Registered',
                        status: 0
                    });
                }
    }
    catch (err) {
        res.status(402).json({
            msg: 'something went wrong',
            err: err
        });
    }
}

// first check IS email exist ? if exist then send link over email and change the password
// const forgotPassword = async (req, res) => {

//     if(await User.findOne({email: req.body.email})){
//         // Use Smtp Protocol to send Email  IT'S WORKING
//         var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//         user: 'vivekrajoriya.yugasa@gmail.com',
//         pass: 'Vivek@yugasa123'
//         }
//     });

//     var mailOptions = {
//         from: 'vivekrajoriya.yugasa@gmail.com',
//         to: user.email,
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//         console.log(error);
//         } else {
//         console.log('Email sent: ' + info.response);
//         }
//     });
//     }else{
//         res.status(400).json({
//             status:0,
//             msg:'email doresn\' t exist '
//         })
//     }
// }
controller = module.exports = { registeration, login };