import React, { useState } from 'react';
import { TextField, Button, Box, Container, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.component';
import Footer from '../components/Footer.component';

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.replace('/')
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
        <Navbar />
        <Container>
            <Typography variant='h2' component="h1" mt={3} mb={3}>{'Login'}</Typography>
            <Divider sx={{ marginBottom: 3 }}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
            <form onSubmit={handleSubmit} onReset={handleReset} style={{ width: '90%', maxWidth: 400 }}>
                <TextField
                name="first_name"
                label="First Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                value={formData.first_name}
                onChange={handleInputChange}
                />
                <TextField
                name="last_name"
                label="Last Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={formData.last_name}
                onChange={handleInputChange}
                />
                <TextField
                name="username"
                label="Username"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={formData.username}
                onChange={handleInputChange}
                />
                <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                required
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
                />
                <TextField
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                required
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                />
                <Box sx={{display:'flex', justifyContent:'center', gap:'1em', margin:'1em'}}>
                    <Button type="submit" variant="contained" size="large">
                        Sign up
                    </Button>
                    <Button type="reset" variant="contained" size="large">
                        Reset
                    </Button>
                </Box>
                <Box sx={{ mt: '2em', textAlign: 'center' }}>
                <Link to="/login" variant="body2">
                    Already have an account? Login
                </Link>
                </Box>
            </form>
            </Box>
        </Container>
        <Footer />
    </>
  );
};

export default Signup;