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
    },
    completedLevel: {
        type: Number,
        default: 0
    },
    lastFirstSessionScore: { 
        type: Number,
        default: 0
    },
    lastSecondSessionScore: { 
        type: Number,
        default: 0 
    },
    lastThirdSessionScore: { 
        type: Number,
        default: 0
    },
    lastFourthSessionScore: {
        type: Number,
        default: 0
    },
    lastFifthSessionScore: {
        type: Number,
        default: 0
    },
    lastSixthSessionScore: {
        type: Number,
        default: 0
    },
    lastSeventhSessionScore: {
        type: Number,
        default: 0
    },
    lastEighthSessionScore: {
        type: Number,
        default: 0
    },
    lastNinthSessionScore: {
        type: Number,
        default: 0
    },
    lastTenthSessionScore: {
        type: Number,
        default: 0
    }
});

module.exports = User = mongoose.model('user',UserSchema);