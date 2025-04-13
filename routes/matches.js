const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find().populate('players');
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new match (Admin only)
router.post('/', isAdmin, async (req, res) => {
    try {
        const match = new Match(req.body);
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update match status (Admin only)
router.patch('/:id/status', isAdmin, async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: 'Match not found' });
        
        match.status = req.body.status;
        await match.save();
        res.json(match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 