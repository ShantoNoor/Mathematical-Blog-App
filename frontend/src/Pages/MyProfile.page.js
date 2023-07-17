import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Divider
} from "@mui/material";
import Navbar from "../components/Navbar.component";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch user data on mount
    // fetch("/api/user")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => console.error(error));

    const u = {
        profile_picture: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
        first_name: 'Hello',
        last_name: 'World',
        username: 'afcalk',
        email: 'helloworld@gmail.com',
        phone: '234242342432',
        birth_date: '1212345'
      }
      setUser(u);
        setLoading(false);
  }, []);

  const handleUpdate = () => {
    setLoading(true);
    // Make PUT/patch request to update user data
    fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
        setOpenSnackbar(true);
      })
      .catch((error) => console.error(error));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>{'My Profile'}</Typography>
        <Divider sx={{ marginBottom: 3 }}/>
        <Box sx={{display:'flex', justifyContent:'center', gap:'2em',
          [`@media (max-width: 550px)`]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}>
          <Box>
            <Avatar src={user.profile_picture} sx={{height:'250px', width:'250px',
          }}/>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', gap:'2em', flex:'1',
            [`@media (max-width: 550px)`]: {
              minWidth: '90vw'
            }
          }}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <TextField
              label="First Name"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Birth Date"
              name="birth_date"
              value={user.birth_date}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Update successful"
          />
        </Box>
      </Container>
    </>
  );
};

export default Profile;