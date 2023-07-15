import { Card, CardActions, CardContent, CardHeader, Typography, IconButton, Tooltip, Box, Avatar, Menu, MenuItem } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';


const PostItem = ({post}) => {
  const formattedDate = new Date(post.created_at).toLocaleString('en-US', {
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


  return (
    <Card sx={{}}>
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {post.title}
        </Typography>
      </CardContent>

      <CardHeader 
        title={`@${post.added_by.username}`}
        subheader={formattedDate}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.added_by.first_name[0]}
          </Avatar>
        }
        action={
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
              <MenuItem onClick={() => navigate(`/posts/${post.id}`)}>Read Blog</MenuItem>
              <MenuItem>Edit Blog</MenuItem>
              <MenuItem>Delete Blog</MenuItem>
              <MenuItem>View Profile</MenuItem>
            </Menu>
          </>
        }
      />

      <CardActions>
        <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%"
      }}>
          <Tooltip title="Blog Likes">
            <Box sx={{ display:'flex', alignItems: 'center', marginLeft: 1}}>
              <FavoriteIcon color='error'/>
              <Typography variant='span'>43</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Blog Rating">
            <Box sx={{ display:'flex', alignItems: 'center', marginLeft: 1}}>
              <StarIcon color='primary'/>
              <Typography variant='span'>4.3</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Blog Views">
            <Box sx={{ display:'flex', alignItems: 'center', marginLeft: 1}}>
              <WatchLaterIcon color='success'/>
              <Typography variant='span'>{post.views}</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Read Blog">
            <IconButton aria-label="read" onClick={() => navigate(`/posts/${post.id}`)}>
              <ArticleIcon color='secondary'/>
              <Typography variant='span' component='span' sx={{fontSize: '16px'}}>READ</Typography>
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  )
}

export default PostItem