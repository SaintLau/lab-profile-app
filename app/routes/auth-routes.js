const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const passport = require('passport');

//Signup
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    //Server side validation on empty fields
    if (username === '' || password === '') {
        res.statusMessage(400).json('missing fields')
        return;
    }

    //Server side validation on password constrain
    //Regular expressions
    
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegex.test(password) === false) {
        res.status(400).json('weak password');
        return;
    }

    User.findOne({username: username})
    .then((user) => {
        if (user) {
            res.status(400).json('username already exists');
            return;
        }

        //Create the user
    })
})