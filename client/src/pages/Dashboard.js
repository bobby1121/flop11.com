import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [matchesRes, teamsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/matches', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/teams/my-teams', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setMatches(matchesRes.data);
        setTeams(teamsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Upcoming Matches
            </Typography>
            {matches.map((match) => (
              <Card key={match._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {match.team1} vs {match.team2}
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(match.date).toLocaleDateString()} at {match.venue}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/create-team/${match._id}`)}
                  >
                    Create Team
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              My Teams
            </Typography>
            {teams.map((team) => (
              <Card key={team._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {team.match.team1} vs {team.match.team2}
                  </Typography>
                  <Typography color="textSecondary">
                    Points: {team.totalPoints}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/leaderboard/${team.match._id}`)}
                  >
                    View Leaderboard
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 