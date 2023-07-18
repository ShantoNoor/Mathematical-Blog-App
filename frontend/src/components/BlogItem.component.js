import { Card, CardActions, CardContent, CardHeader, Typography, IconButton, Tooltip, Box, Avatar, Menu, MenuItem } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { purple, red } from '@mui/material/colors';

const BlogItem = ({blog}) => {
  const formattedDate = new Date(blog.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userId, setUserId] = useState(undefined)
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      fetch('http://127.0.0.1:8000/auth/users/me/', {
        method: 'GET',
        headers: {
          Authorization: `JWT ${accessToken}`
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setUserId(data.id)
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [])

  return (
    <Card>
      <CardContent sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Typography variant="h5" color="text.secondary">
          {blog.title}
        </Typography>
        {(blog.blog_status!=='Published') ? <Typography variant='span' sx={{backgroundColor:purple[500], color:'#fff', padding:'5px', borderRadius:'50px'}}>
          {blog.blog_status}
        </Typography> : ''}
      </CardContent>

      <CardHeader 
        title={`@${blog.author.username}`}
        subheader={formattedDate}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.author.first_name[0]}
          </Avatar>
        }
        action={
          <>
          {(userId === blog.author.id) && 
            <>
            <IconButton aria-label="settings"
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={() => {
                navigate(`/blogs/edit/${blog.id}/`)
              }}>Edit Blog</MenuItem>

              <MenuItem onClick={() => {
                fetch(`http://127.0.0.1:8000/api/blogs/${blog.id}/my_blog/`, {
                    method: 'DELETE',
                    headers: {
                      'Authorization': `JWT ${localStorage.getItem('access_token')}`,
                      mode: 'cors', 
                      credentials: 'include',
                    }
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data)
                    })
                    .catch((error) => console.error(error));
                    window.location.reload();
              }}>Delete Blog</MenuItem>
            </Menu>
            </> }
          </>
        }
      />

      <CardActions>
        <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%"
      }}>
          <Tooltip title="Blog Rating">
            <Box sx={{ display:'flex', alignItems: 'center', marginLeft: 1}}>
              <StarIcon color='primary'/>
              <Typography variant='span'>{blog.rating}</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Blog Views">
            <Box sx={{ display:'flex', alignItems: 'center', marginLeft: 1}}>
              <WatchLaterIcon color='success'/>
              <Typography variant='span'>{blog.views}</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Read Blog">
            { userId === blog.author.id ? 
              <IconButton aria-label="read" onClick={() => navigate(`/blogs/my_blog/${blog.id}/`)} sx={{borderRadius: '8px', '&:hover': { borderRadius: '8px'}}}>
                <ArticleIcon color='secondary'/>
                <Typography variant='span' component='span' sx={{fontSize: '16px'}}>READ</Typography>
              </IconButton> :
              <IconButton aria-label="read" onClick={() => navigate(`/blogs/${blog.id}`)} sx={{borderRadius: '8px', '&:hover': { borderRadius: '8px'}}}>
                <ArticleIcon color='secondary'/>
                <Typography variant='span' component='span' sx={{fontSize: '16px'}}>READ</Typography>
              </IconButton>
            }
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  )
}

export default BlogItem