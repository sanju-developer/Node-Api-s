const mongoose = require('mongoose');
const body_parser = require('body-parser');


const UserSchema = mongoose.Schema({
    name : { type: String },
    address:{ type: String },
    email: { type: String },
    password: { type: String },
    contact: { type: Number },
    city:{ type: String },
    state: { type: String }
});

const User = module.exports = mongoose.model('User', UserSchema);
