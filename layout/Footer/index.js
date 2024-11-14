import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';


const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#003366", padding: "40px 0", color: "white" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              MyWebsite
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              A place for all your needs. Connect with us for exciting updates and offers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "block", marginBottom: 1 }}>
                Home
              </Link>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "block", marginBottom: 1 }}>
                About
              </Link>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "block", marginBottom: 1 }}>
                Services
              </Link>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "block", marginBottom: 1 }}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "inline-block", marginRight: 2 }}>
                Facebook
              </Link>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "inline-block", marginRight: 2 }}>
                Instagram
              </Link>
              <Link href="#" sx={{ color: "white", textDecoration: "none", display: "inline-block", marginRight: 2 }}>
                Twitter
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} MyWebsite. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
