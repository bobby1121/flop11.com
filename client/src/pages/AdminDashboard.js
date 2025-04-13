import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [openMatchDialog, setOpenMatchDialog] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    team: '',
    role: '',
    price: '',
  });
  const [newMatch, setNewMatch] = useState({
    team1: '',
    team2: '',
    date: '',
    venue: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [playersRes, matchesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/players', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/matches', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setPlayers(playersRes.data);
        setMatches(matchesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleAddPlayer = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/players', newPlayer, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpenPlayerDialog(false);
      setNewPlayer({ name: '', team: '', role: '', price: '' });
      // Refresh players list
      const res = await axios.get('http://localhost:5000/api/players', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlayers(res.data);
    } catch (err) {
      console.error('Error adding player:', err);
    }
  };

  const handleAddMatch = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/matches', newMatch, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpenMatchDialog(false);
      setNewMatch({ team1: '', team2: '', date: '', venue: '' });
      // Refresh matches list
      const res = await axios.get('http://localhost:5000/api/matches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatches(res.data);
    } catch (err) {
      console.error('Error adding match:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Players</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenPlayerDialog(true)}
              >
                Add Player
              </Button>
            </Box>
            {players.map((player) => (
              <Card key={player._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{player.name}</Typography>
                  <Typography color="textSecondary">
                    {player.team} - {player.role}
                  </Typography>
                  <Typography>Points: {player.points}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Matches</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenMatchDialog(true)}
              >
                Add Match
              </Button>
            </Box>
            {matches.map((match) => (
              <Card key={match._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {match.team1} vs {match.team2}
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(match.date).toLocaleDateString()} at {match.venue}
                  </Typography>
                  <Typography>Status: {match.status}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        {/* Add Player Dialog */}
        <Dialog open={openPlayerDialog} onClose={() => setOpenPlayerDialog(false)}>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Team"
              value={newPlayer.team}
              onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Role"
              value={newPlayer.role}
              onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={newPlayer.price}
              onChange={(e) => setNewPlayer({ ...newPlayer, price: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPlayerDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPlayer} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Match Dialog */}
        <Dialog open={openMatchDialog} onClose={() => setOpenMatchDialog(false)}>
          <DialogTitle>Add New Match</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Team 1"
              value={newMatch.team1}
              onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Team 2"
              value={newMatch.team2}
              onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={newMatch.date}
              onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Venue"
              value={newMatch.venue}
              onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenMatchDialog(false)}>Cancel</Button>
            <Button onClick={handleAddMatch} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 