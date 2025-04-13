import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <SportsCricketIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          FLOP11
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ color: 'white', mx: 1 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            sx={{ color: 'white', mx: 1 }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/register"
            sx={{ color: 'white', mx: 1 }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/dashboard"
            sx={{ color: 'white', mx: 1 }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 