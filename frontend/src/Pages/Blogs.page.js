import React, { useEffect, useState } from 'react'
import BlogItem from '../components/BlogItem.component'
import { Container, Typography, Divider, Grid } from '@mui/material';
import Navbar from '../components/Navbar.component';
import { useNavigate } from 'react-router-dom';


const Blogs = ({me=false}) => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
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
    const myHeaders = new Headers();
    if(me) myHeaders.append("Authorization", `JWT ${localStorage.getItem('access_token')}`);

    const endPoint = me ? 'http://127.0.0.1:8000/api/blogs/me/' : 'http://127.0.0.1:8000/api/blogs/'
    fetch(endPoint, {
      headers: myHeaders
    })
      .then(response => {
				if(response.statusText === 'OK')
					return response.json()
				return []
			})
      .then(blogs => {
				if(blogs !== []) {
          console.log(blogs)
          setBlogs(blogs)
				}
      })
      .catch(error => {
        console.error(error)
        navigate('/*', { replace: true })
      })
  }, [me])

  const [searchValue, setSearchValue] = useState('')
  useEffect(()=>{
    const filtered_blogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBlogs(filtered_blogs)
  }, [searchValue, blogs])

  return (
    <>
      <Navbar showSearchBar={true} handelSearchChange={setSearchValue} searchValue={searchValue} />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>{me ? 'My Blogs' : 'All Blogs'}</Typography>
        <Divider sx={{ marginBottom: 3 }}/>
        <Grid container spacing={3} alignItems="stretch">
          {filteredBlogs.map(blog => <Grid item xs={12} sm={6} md={4} key={blog.id}><BlogItem blog={blog} /></Grid> )}
        </Grid>
      </Container>
    </>
  )
}

export default Blogs