const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

// Registering a new user
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

// Logging in a user
router.route('/login')
    .get(
        users.renderLogin)
    .post(
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
        users.login)

// Logging out a user
router.get('/logout', users.logout);

module.exports = router;