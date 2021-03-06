const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Auth user
// @access Public
router.post('/', (req,res) => {
    const {username , password} = req.body;

    // Validation
    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({username})
    .then(user => {
        if(user.role != "Admin") return res.status(400).json({ msg : 'User does not exist'});
        if(!user) return res.status(400).json({ msg : 'User does not exist'});

        // Validate Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            msg: 'Successfully logged in',
                            token,
                            user : {
                                id: user.id,
                                name: user.name,
                                username: user.username
    
                            }
                        })
                    }
                )
            })
    })
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, (req, res) => {
   User.findById(req.user.id)
    .select('-password') 
    .then(user => res.json(user));
});


module.exports = router;