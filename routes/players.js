const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.isAdmin) return res.status(403).json({ message: 'Access denied' });
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new player (Admin only)
router.post('/', isAdmin, async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update player points (Admin only)
router.patch('/:id/points', isAdmin, async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        
        player.points = req.body.points;
        await player.save();
        res.json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 