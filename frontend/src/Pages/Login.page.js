import React, { useState } from 'react';
import { TextField, Button, Divider, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar.component';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.component';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/auth/jwt/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.access);

        // Save access token to local storage
        localStorage.setItem('access_token', data.access);

        // Redirect to home page if login is successful
        window.location.replace('/');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoginError('Invalid username or password');
      });
  };

  return (
    <>
        <Navbar />
        <Container>
            <Typography variant='h2' component="h1" mt={3} mb={3}>{'Login'}</Typography>
            <Divider sx={{ marginBottom: 3 }}/>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                <TextField
                    id="username"
                    label="Username"
                    style={{ margin: 8, minWidth: '35%' }}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    style={{ margin: 8, minWidth: '35%' }}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button variant="contained" color="primary" style={{ margin: 16 }} onClick={handleLogin}>
                    Login
                </Button>
                {loginError && <p>{loginError}</p>}
                <Link to="/signup" style={{ marginTop: 16 }}>
                    Don't have an account? Create one.
                </Link>
            </form>
        </Container>
      <Footer />
    </>
  );
};

export default Login;