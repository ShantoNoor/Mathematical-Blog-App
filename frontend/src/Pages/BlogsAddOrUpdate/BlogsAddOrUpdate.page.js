import React, { useEffect, useState } from 'react'
import './BlogsAddOrUpdate.style.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.component'
import { Container, Divider, Typography, TextField, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import LinkList from '../../components/LinkList.compnoent';
import Footer from '../../components/Footer.component';

const BlogsAddOrUpdate = ({my_blog=false}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [blogStatus, setBlogStatus] = useState('Pending');
  const { id } = useParams()

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
    setFileUploaded(true)
  }

  useEffect(() => {
    if(my_blog) {
      fetch(`http://127.0.0.1:8000/api/blogs/${id}/my_blog`, {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access_token')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setTitle(data.title)
          setContent(data.content)
          setBlogStatus(data.blog_status)
          setFiles(data.images)
        })
        .catch((error) => console.error(error));
    }
  }, [id, my_blog])

  const addBlog = (event) => {
    event.preventDefault();
    // Add your logic to submit the form data

    event.preventDefault()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${localStorage.getItem('access_token')}`);
    // if(my_blog) myHeaders.append("Content-Type", 'application/json');

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("blog_status", blogStatus);

    if(fileUploaded) {
      Array.from(files).forEach(file => {
        formdata.append("uploaded_images", file);
      });
    }

    const METHOD = my_blog ? 'PUT' : 'POST'
    const requestOptions = {
      method: METHOD,
      headers: myHeaders,
      body: formdata,
      mode: 'cors', 
      credentials: 'include'
    };

    let url = "http://127.0.0.1:8000/api/blogs/";
    if(my_blog) url = url + id + '/my_blog/'

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        navigate('/blogs/me', { replace: true })
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        navigate('/*', { replace: true })
      });
  }

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>{my_blog ? 'Update Blog' : 'Add Blog'}</Typography>
        <Divider />
        <form className='blog-form' onSubmit={addBlog}>
          <TextField
            className='blog-form__title'
            type='text'
            name='title'
            placeholder='Blog Title'
            value={title}
            onChange={handleTitleChange}
            fullWidth
            label='Title'
            multiline
            rows={4}
            size='medium'
          />
          <TextField
            className='blog-form__content'
            name='content'
            placeholder='Blog Content'
            value={content}
            onChange={handleContentChange}
            fullWidth
            label='Content'
            multiline
            rows={14}
            size='medium'
          />
          <input className='blog-form__img-upload' type='file' multiple name='uploaded_images' onChange={handelFiles} />
          <FormControl className='blog-form__status' sx={{ width: '100%' }}>
            <InputLabel id='blog-status-label'>Blog Status</InputLabel>
            <Select
              name='blog_status'
              value={blogStatus}
              label='blog_status'
              onChange={handleStatusChange}
              labelId='blog-status-label'
            >
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Published'>Published</MenuItem>
            </Select>
          </FormControl>
          <Button className='blog-form__submit' type='submit' variant='contained' size='large'>{my_blog ? 'Update' : 'Add'}</Button>
        </form>
        <Box className='img-preview'>
          <Typography sx={{margin: '10px auto'}} variant='h5'>{files && files.length!==0 ? 'Blog Images': ''}</Typography>
          {files && Array.from(files).map(file => <LinkList key={file.id} link_text={'http://127.0.0.1:8000' + file.image} />)}
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default BlogsAddOrUpdate