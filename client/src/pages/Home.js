import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <SportsCricketIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FLOP11
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          The Fantasy Cricket Game Where Lowest Points Win!
        </Typography>
        <Box sx={{ mt: 4, mb: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Create Your Team
              </Typography>
              <Typography color="textSecondary">
                Select 11 players and choose your captain and vice-captain to create your fantasy team.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Track Performance
              </Typography>
              <Typography color="textSecondary">
                Monitor your team's performance and see how you rank against other players.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Win Big
              </Typography>
              <Typography color="textSecondary">
                The team with the lowest points wins! A unique twist on fantasy cricket.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 