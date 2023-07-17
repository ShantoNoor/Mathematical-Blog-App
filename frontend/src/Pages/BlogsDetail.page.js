import { useEffect, useState } from 'react';
import Markdown from '../components/Markdown/Markdown.component'
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Divider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar.component';

const BlogsDetail = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams()
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/blogs/' + id)
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
				}
      })
      .catch(error => {
        console.error(error)
        navigate('/*', { replace: true })
      })
  })

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant='h2' component="h1" mt={3} mb={3}>{title}</Typography>
        <Divider sx={{ marginBottom: 3 }}/>
        <CssBaseline >
          <Markdown content={content} />
        </CssBaseline>
      </Container>
    </>
  )
}

export default BlogsDetail