const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get user's teams
router.get('/my-teams', async (req, res) => {
    try {
        const teams = await Team.find({ user: req.user.id })
            .populate('match')
            .populate('players')
            .populate('captain')
            .populate('viceCaptain');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new team
router.post('/', async (req, res) => {
    try {
        const { match, players, captain, viceCaptain } = req.body;
        
        // Validate team size
        if (players.length !== 11) {
            return res.status(400).json({ message: 'Team must have exactly 11 players' });
        }

        const team = new Team({
            user: req.user.id,
            match,
            players,
            captain,
            viceCaptain
        });
        
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get leaderboard for a match
router.get('/leaderboard/:matchId', async (req, res) => {
    try {
        const teams = await Team.find({ match: req.params.matchId })
            .populate('user', 'username')
            .sort({ totalPoints: 1 }); // Sort by lowest points first
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 