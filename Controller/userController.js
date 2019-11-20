const router = require('express').Router();
const User = require('../db').import('../Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//! SIGN UP
router.post('/signup', (req, res) => {
    User.create({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email:req.user.email,
        password: bcrypt.hashSync(req.user.password, 10)
    }).then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*12}) //setting the session time to 12 hours
            res.json({
                user: user,
                message: 'Welcome to Family Circle',
                sessionToken: token
            })
        },
        createError = err => res.send(500, console.log('Create Success Error'), err.message)
    )
})

//! LOGIN
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.user.email
            // Thinking about adding an id verification here.
        }
    }).then(user => {
        if(user){
            bcrypt.compare(req.user.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*12 })
                    res.json({
                        user: user,
                        message: 'Welcome Back Home!',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'Bad Gateway'})
                }
            })
        } else {
            res.status(500). send({error: 'Membership Authentication wasn\'t met.'})
        }
    },
    function (err) {
        res.status(501).send({error: 'Process Failed'})
    })
})

module.exports = router;