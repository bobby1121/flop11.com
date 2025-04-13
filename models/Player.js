const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'],
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema); 