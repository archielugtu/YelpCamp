const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // not really a validation
    }
})

// Adds on to schema a username, and password, makes username unique,and etc
UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema);
module.exports = User;