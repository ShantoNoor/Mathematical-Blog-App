import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem.component'
import { Container, Typography, Divider, Grid } from '@mui/material';
import Navbar from '../components/Navbar.component';
import { useNavigate } from 'react-router-dom';


const Blogs = () => {
  const [blogs, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const navigate = useNavigate();
  const u = {
    profile_picture: 'asjfsasdasfasfasf',
    first_name: 'Hello',
    last_name: 'World',
    username: 'afcalk',
    email: 'helloworld@gmail.com',
    phone: '234242342432',
    birth_date: '1212345'
  }
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/blogs/')
      .then(response => {
				if(response.statusText === 'OK')
					return response.json()
				return []
			})
      .then(blogs => {
				if(blogs !== []) {
          setPosts(blogs)
				}
      })
      .catch(error => {
        console.error(error)
        navigate('/*', { replace: true })
      })
  }, [])

  const [searchValue, setSearchValue] = useState('')
  useEffect(()=>{
    const filtered_posts = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPosts(filtered_posts)
  }, [searchValue, blogs])

  return (
    <>
      <Navbar showSearchBar={true} handelSearchChange={setSearchValue} searchValue={searchValue} />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>All Blogs</Typography>
        <Divider sx={{ marginBottom: 3 }}/>
        <Grid container spacing={3} alignItems="stretch">
          {filteredPosts.map(blog => <Grid item xs={12} sm={6} md={4} key={blog.id}><PostItem blog={blog} /></Grid> )}
        </Grid>
      </Container>
    </>
  )
}

export default Blogs