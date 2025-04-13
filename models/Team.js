const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    viceCaptain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    totalPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema); 