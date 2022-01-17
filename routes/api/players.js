const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

//Player Model
const Player = require('../../models/User');

// @route   GET api/players
// @desc    GET All Players
// @access  Public
router.get('/', (req,res) => {
    User.find()
        .sort({date: -1})
        .then(players => res.json(players))
});

// @route   POST api/players
// @desc    Create A Player
// @access  Private
// router.post('/', auth, (req,res) => {
//     const newPlayer = new Player({
//         name: req.body.name
//     });

//     newPlayer.save().then(player => res.json(player));
// });

// @route   DELETE api/players/:id
// @desc    Delete A Player
// @access  Private
router.delete('/:id', auth, (req,res) => {
    User.findById(req.params.id)
        .then(player => player.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;