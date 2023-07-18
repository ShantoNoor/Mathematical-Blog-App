import React, { useState } from 'react'
import './BlogsAdd.style.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar.component'
import { Container, Divider, Typography, TextField, Box, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

const BlogsAdd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null)
  const [blogStatus, setBlogStatus] = useState('Pending');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleStatusChange = (event) => {
    setBlogStatus(event.target.value);
  };

  const handelFiles = event => {
    setFiles(event.target.files)
  }

  const addBlog = (event) => {
    event.preventDefault();
    // Add your logic to submit the form data

    event.preventDefault()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${localStorage.getItem('access_token')}`);

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("blog_status", blogStatus);

    if(files !== null) {
      Array.from(files).forEach(file => {
        formdata.append("uploaded_images", file);
      });
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/api/blogs/", requestOptions)
      .then(response => response.text())
      .then(result => {
        // console.log(result)
        navigate('/blogs/me', { replace: true })
      })
      .catch(error => {
        console.log('error', error)
        navigate('/*', { replace: true })
      });
  }

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>Add Blog</Typography>
        <Divider />
        <form className='blog-form' onSubmit={addBlog}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box className='left'>
                <TextField
                  type='text'
                  name='title'
                  placeholder='Blog Title'
                  value={title}
                  onChange={handleTitleChange}
                  fullWidth
                  label='Title'
                />
                <input type='file' multiple name='uploaded_images' onChange={handelFiles} />
                <FormControl>
                  <InputLabel id='blog-status-label'>Blog Status</InputLabel>
                  <Select
                    name='blog_status'
                    value={blogStatus}
                    onChange={handleStatusChange}
                    labelId='blog-status-label'
                  >
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='Published'>Published</MenuItem>
                  </Select>
                </FormControl>
                <Button type='submit' variant='contained'>Add</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} >
              <Box className='right'>
                <TextField
                  className='content'
                  name='content'
                  placeholder='Blog Content'
                  value={content}
                  onChange={handleContentChange}
                  fullWidth
                  label='Content'
                  multiline
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
}

export default BlogsAdd