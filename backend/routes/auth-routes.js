const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(password, salt);
        User.create({
            username,
            password: hashPassword
        }).then((response) => {
            res.status(200).json(response)
        }).catch((error) => {
            //.code is mongoose validation error
            if (error.code === 11000) {
                res.status(500).json('username should be unique')
            }
        });
    });
});

//LOGIN - with passport

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user'});
            return;
        }
        if (!theUser) {
            //"failureDetails contains the error messages"
            res.status(401).json(failureDetails);
            return;
        }
        //save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went wrong.'});
                return;
            }
            //Now logged in, we can send req.user
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

//UPLOAD

router.post('/upload', (req, res, next) => {

});

//EDIT

router.post('/edit', (req, res, next) => {
    const { _id } = req.body;
    User.findByIdAndUpdate(_id, req.body, { new: true })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
});



//LOGOUT

router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json('logout sucess');
});

//LoggedIn
router.get('/loggedin', (req, res) => {
    if (req.isAuthenticated()){
        res.status(200).json(req.user);
        return;
    }
    res.status(200).json({});
});

module.exports = router;