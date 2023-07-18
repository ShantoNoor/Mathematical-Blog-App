import React, { useState } from 'react';
import { Button, Snackbar, Box, Typography } from '@mui/material';

const LinkList = ({link_text}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link_text);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{border: '1px solid #eee', display:'flex', justifyContent:'space-between', minWidth:'60%', margin:'1px auto', alignItems: 'center', paddingLeft: '1em' }}>
      <Typography sx={{textOverflow: 'ellipsis'}} variant='p' component='span'>{link_text}</Typography>
      <Button variant="contained" onClick={handleCopyLink}>
        Copy
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard!"
      />
    </Box>
  );
};

export default LinkList;
