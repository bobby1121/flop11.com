import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';

const CreateTeam = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState('');
  const [viceCaptain, setViceCaptain] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/players`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlayers(res.data);
      } catch (err) {
        console.error('Error fetching players:', err);
      }
    };
    fetchPlayers();
  }, []);

  const handlePlayerSelect = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
      if (captain === playerId) setCaptain('');
      if (viceCaptain === playerId) setViceCaptain('');
    } else {
      if (selectedPlayers.length < 11) {
        setSelectedPlayers([...selectedPlayers, playerId]);
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedPlayers.length !== 11) {
      alert('Please select exactly 11 players');
      return;
    }
    if (!captain || !viceCaptain) {
      alert('Please select captain and vice-captain');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/teams`,
        {
          match: matchId,
          players: selectedPlayers,
          captain,
          viceCaptain,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating team:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Your Team
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Select Players (11)
                </Typography>
                <List>
                  {players.map((player) => (
                    <ListItem key={player._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedPlayers.includes(player._id)}
                            onChange={() => handlePlayerSelect(player._id)}
                          />
                        }
                        label={
                          <Box>
                            <Typography>{player.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {player.team} - {player.role} - Points: {player.points}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Selected Players ({selectedPlayers.length}/11)
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Select Captain
                </Typography>
                <RadioGroup value={captain} onChange={(e) => setCaptain(e.target.value)}>
                  {selectedPlayers.map((playerId) => {
                    const player = players.find(p => p._id === playerId);
                    return (
                      <FormControlLabel
                        key={playerId}
                        value={playerId}
                        control={<Radio />}
                        label={player?.name}
                      />
                    );
                  })}
                </RadioGroup>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Select Vice-Captain
                </Typography>
                <RadioGroup value={viceCaptain} onChange={(e) => setViceCaptain(e.target.value)}>
                  {selectedPlayers.map((playerId) => {
                    const player = players.find(p => p._id === playerId);
                    return (
                      <FormControlLabel
                        key={playerId}
                        value={playerId}
                        control={<Radio />}
                        label={player?.name}
                        disabled={playerId === captain}
                      />
                    );
                  })}
                </RadioGroup>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ mt: 2 }}
                  disabled={selectedPlayers.length !== 11 || !captain || !viceCaptain}
                >
                  Create Team
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateTeam; 