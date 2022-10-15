const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');


// @route  POST api/authPlayer
// @desc   Authentication the user
// @access Public
router.post('/', (req,res) => {
    const { username , password} = req.body;

    // Validation
    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({username})
    .then(user => {
        if(!user) return res.status(400).json({ msg : 'User does not exists'});

        // Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

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
                            username: user.username,
                            totalScore: user.totalScore,
                            completedLevel: user.completedLevel,
                            lastFirstSessionScore: user.lastFirstSessionScore,
                            lastSecondSessionScore: user.lastSecondSessionScore,
                            lastThirdSessionScore: user.lastThirdSessionScore,
                            lastFourthSessionScore: user.lastFourthSessionScore,
                            lastFifthSessionScore: user.lastFifthSessionScore,
                            lastSixthSessionScore: user.lastSixthSessionScore,
                            lastSeventhSessionScore: user.lastSeventhSessionScore,
                            lastEighthSessionScore: user.lastEighthSessionScore,
                            lastNinthSessionScore: user.lastNinthSessionScore,
                            lastTenthSessionScore: user.lastTenthSessionScore
                        }
                    })
                }
            )
        })
    })
});


// @route  GET api/authPlayer/user
// @desc   Get player data
// @access Private
router.get('/user',auth, (req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));  
});


// @route   UPDATE api/authplayer/update/:id
// @desc    Update A Player
// @access  Private
router.put('/update/:id', auth, (req,res) => {
    
    const newData = {
        lastPlayedDateTime : req.body.lastPlayedDateTime,
        lastSessionScore : req.body.lastSessionScore,
        totalScore : req.body.totalScore,
        completedLevel : req.body.completedLevel,
        lastFirstSessionScore: req.body.lastSessionScore,
        lastSecondSessionScore: req.body.lastSecondSessionScore,
        lastThirdSessionScore: req.body.lastThirdSessionScore,
        lastFourthSessionScore: req.body.lastFourthSessionScore,
        lastFifthSessionScore: req.body.lastFifthSessionScore,
        lastSixthSessionScore: req.body.lastSixthSessionScore,
        lastSeventhSessionScore: req.body.lastSeventhSessionScore,
        lastEighthSessionScore: req.body.lastEighthSessionScore,
        lastNinthSessionScore: req.body.lastNinthSessionScore,
        lastTenthSessionScore: req.body.lastTenthSessionScore
    }

    User.findByIdAndUpdate(req.params.id, newData)
    .then(player => {
        if(player) {
            return res.json({msg: 'Update Successful!',
                player : {
                    name : player.name,
                    lastPlayedDateTime: player.lastPlayedDateTime,
                    lastSessionScore: player.lastSessionScore,
                    totalScore: player.totalScore,
                    completedLevel: player.completedLevel,
                    lastFirstSessionScore: player.lastFirstSessionScore,
                    lastSecondSessionScore: player.lastSecondSessionScore,
                    lastThirdSessionScore: player.lastThirdSessionScore,
                    lastFourthSessionScore: player.lastFourthSessionScore,
                    lastFifthSessionScore: player.lastFifthSessionScore,
                    lastSixthSessionScore: player.lastSixthSessionScore,
                    lastSeventhSessionScore: player.lastSeventhSessionScore,
                    lastEighthSessionScore: player.lastEighthSessionScore,
                    lastNinthSessionScore: player.lastNinthSessionScore,
                    lastTenthSessionScore: player.lastTenthSessionScore
                }
            });
        }else {
            return res.json({msg: 'User does not exist!'})
        }
    })
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;