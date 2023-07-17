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
  Divider,
  Input,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from "../components/Navbar.component";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch user data on mount
    fetch("http://127.0.0.1:8000/auth/users/me/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data)
      })
      .catch((error) => console.error(error));
    
    fetch("http://127.0.0.1:8000/api/profiles/me", {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setPreviewImage(data.profile_picture)
        console.log(data)
      })
      .catch((error) => console.error(error));

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

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleUploadClick() {
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    fetch('/api/uploadProfilePicture', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('Profile picture uploaded successfully');
        } else {
          console.log('Failed to upload profile picture');
        }
      })
      .catch(error => {
        console.error('Error uploading profile picture:', error);
      });
  }

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
    return <CircularProgress style={{ position: 'absolute', top: '10%', left: '45%' }}
    size={100}/>;
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
            <Avatar src={previewImage} sx={{height:'250px', width:'250px'}}/>
            <Box>
              <Input
                type="file"
                onChange={handleFileInputChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                name="profile_picture"
              />
              <label htmlFor="file-input">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  sx={{width:'100%', marginTop:'2em'}}
                >
                  Upload Photo
                </Button>
              </label>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', gap:'2em', flex:'1',
            [`@media (max-width: 550px)`]: {
              minWidth: '90vw'
            }
          }}>
            <Typography variant="h4" gutterBottom>
              {user ? user.username : ''}
            </Typography>
            <TextField
              label="First Name"
              name="first_name"
              value={user ? user.first_name : ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={user ? user.last_name : ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={user ? user.email : ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={profile ? profile.phone : ''}
              onChange={handleChange}
              fullWidth
            />]
            
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Update successful"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Profile;