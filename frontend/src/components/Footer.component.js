import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: '3em',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        &copy; Mathematical Blog App
      </Typography>
    </Box>
  );
};

export default Footer;
