import { useEffect, useState } from 'react';
import Markdown from '../components/Markdown/Markdown.component'
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Divider, Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar.component';
import RatingComponent from '../components/Rating.component';
import Footer from '../components/Footer.component';

const BlogsDetail = ({my_blog=false}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(0);
  const [rating, setRating] = useState(0)
  const [ratingId, setRatingId] = useState(0)

  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    let uid = 0
    if(access_token) {
      fetch("http://127.0.0.1:8000/auth/users/me/", {
        headers: {
          'Authorization': `JWT ${access_token}`
          }
        })
        .then((res) => res.json())
        .then((data) => {
          setUserId(data.id)
          uid = data.id
        })
        .catch((error) => console.error(error));
    } 

    let url = 'http://127.0.0.1:8000/api/blogs/' + id
    if(my_blog) url = url + '/my_blog/'

    fetch(url)
      .then(response => {
				if(response.statusText === 'OK')
					return response.json()
          
        navigate('/*', { replace: true })
				return ''
			})
      .then(data => {
				if(data !== '') {
					setTitle(data.title)
					setContent(data.content)
          const foundObject = data.ratings.find(obj => obj.user_id === uid);
          if(foundObject) {
            setRating(foundObject.rating)
            setRatingId(foundObject.id)
          }
				}
      })
      .catch(error => {
        console.error(error)
        navigate('/*', { replace: true })
      })
    
    
  }, [id, my_blog, navigate, ratingId, userId, rating])

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>{title}</Typography>
        <Divider sx={{ marginBottom: 3 }}/>
        <CssBaseline >
          <Markdown content={content} />
        </CssBaseline>
        {userId &&
        <Box>
          <Divider sx={{ marginBottom: 3 }}/>
          <Typography variant='h4' component="h4" mt={3} mb={3}>{'Leave a rating ...'}</Typography>
          <RatingComponent max={5} userId={userId} rating={rating} id={parseInt(id, 10)} ratingId={ratingId} />
        </Box>}
      </Container>
      <Footer />
    </>
  )
}

export default BlogsDetail