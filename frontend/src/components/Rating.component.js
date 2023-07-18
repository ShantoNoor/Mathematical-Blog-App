import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating, Snackbar } from '@mui/material';

const RatingComponent = ({ max, rating, userId, id, ratingId }) => {
  const [value, setValue] = useState(rating);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [rating_id, setRating_id] = useState(ratingId)

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);

    let METHOD = 'POST'
    let DATA = {
        rating: newValue
    }

    let url = `http://127.0.0.1:8000/api/blogs/${id}/ratings/`
    
    if(rating_id !== 0) {
        url = url + rating_id + '/'

        METHOD = 'PUT'

        DATA = {
            rating: newValue,
            id: rating_id,
            user_id: userId,
            blog_id: id
        }
    }

    fetch(url, {
      method: METHOD,
      body: JSON.stringify(DATA),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access_token')}`
      },
      mode: 'cors', 
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(METHOD === 'POST') setRating_id(data.id)
      })
      .catch((error) => console.error(error));

    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setValue(rating)
    setRating_id(ratingId)
  }, [rating, ratingId])

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">Rating:</Typography>
      <Rating
        value={value}
        max={max}
        onChange={handleRatingChange}
        size="large"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Rating submitted!"
      />
    </Box>
  );
};

export default RatingComponent;
