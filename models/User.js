const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Player'
    },
    lastPlayedDateTime: {
        type: Date,
        default: Date.now() + 5.5*60*60*1000
    },
    lastSessionScore: {
        type: Number,
        default: 0
    },
    totalScore: {
        type: Number,
        default: 0
    }
});

module.exports = User = mongoose.model('user',UserSchema);