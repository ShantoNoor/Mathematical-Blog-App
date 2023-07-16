import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem.component'
import { Container, Typography, Divider, Grid } from '@mui/material';
import Navbar from '../components/Navbar.component';


const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => {
				if(response.statusText === 'OK')
					return response.json()
				return []
			})
      .then(posts => {
				if(posts !== []) {
          setPosts(posts)
          // console.log(posts)
				}
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <Navbar showSearchBar={true} />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>All Blogs</Typography>
        <Divider sx={{ marginBottom: 3 }}/>
        <Grid container spacing={3} alignItems="stretch">
          {posts.map(post => <Grid item xs={12} sm={6} md={4} key={post.id}><PostItem post={post} /></Grid> )}
        </Grid>
      </Container>
    </>
  )
}

export default Posts