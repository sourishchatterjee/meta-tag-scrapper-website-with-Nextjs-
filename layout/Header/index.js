import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';


const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#003366", boxShadow: 4 }}>
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: "white", fontWeight: 'bold' }}>
          Meta Tag Scrapper
          </Typography>
          {isMobile ? (
            <IconButton color="inherit" edge="end">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button color="inherit" sx={{ fontWeight: 'bold' }}>Home</Button>
              <Button color="inherit" sx={{ fontWeight: 'bold' }}>About</Button>
              <Button color="inherit" sx={{ fontWeight: 'bold' }}>Services</Button>
              <Button color="inherit" sx={{ fontWeight: 'bold' }}>Contact</Button>
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
