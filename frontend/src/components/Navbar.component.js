import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
  Divider
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors';
import Search from './Search.component';


const Navbar = ({ showSearchBar=false, handelSearchChange=null, searchValue=null }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuOpen(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuOpen(null);
  };

  const menuItemsLoggedIn = [
    { id:11, text: 'All Blogs', path: '/' },
    { id:12, text: 'My Blogs', path: '/blogs/me' },
  ];

  const menuItemsNotLoggedIn = [
    { id:22, text: 'All Blogs', path: '/' },
    { id:24, text: 'Login', path: '/login' },
    { id:23, text: 'Sign Up', path: '/signup' },
  ];

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      setLoggedIn(true)
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
          // console.log(data);
          setCurrentUser(data)
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [])

  const logoutHandler = () => {
    setLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem('access_token');
    window.location.replace('/')
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Box sx={{cursor:'pointer'}} onClick={() => {console.log('Clicked MBA')}}>
          <Typography variant="h6" component="div">
            Mathematical Blog App
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open mobile menu"
              edge="end"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={mobileMenuOpen}
              onClose={handleMobileMenuClose}
              sx={{ '& .MuiDrawer-paper': { width: '250px' } }}
            >
              <List>
                <ListItem
                  key={'mba'}
                >
                  <ListItemText primary={'Mathematical Blog App'} />
                </ListItem>

                {showSearchBar && <ListItem
                  key={'search'}
                >
                  <Search underline={true} handelSearchChange={handelSearchChange} searchValue={searchValue} />
                </ListItem>}
                
                {loggedIn && menuItemsLoggedIn.map((item) => (
                  <Box key={item.id}>
                    <ListItem
                      onClick={handleMobileMenuClose}
                      component={NavLink}
                      to={item.path}
                      activeclasscame="active"
                    >
                      <ListItemButton>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}

                {!loggedIn && menuItemsNotLoggedIn.map((item) => (
                  <Box key={item.id}>
                    <ListItem
                      onClick={handleMobileMenuClose}
                      component={NavLink}
                      to={item.path}
                      activeclasscame="active"
                    >
                      <ListItemButton>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}

                {loggedIn && <>
                  <ListItem
                    key={'me'}
                    component={NavLink}
                    to='/me'
                    activeclasscame="active"
                  >
                    <ListItemButton>
                      <ListItemText primary={'My Profile'} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem
                    key={'logout'}
                    onClick={logoutHandler}
                    component={NavLink}
                    to='/'
                    activeclasscame="active"
                  >
                    <ListItemButton>
                      <ListItemText primary={'Logout'} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            {showSearchBar && <Search handelSearchChange={handelSearchChange} searchValue={searchValue} />}

            <Box>
              {loggedIn && menuItemsLoggedIn.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  component={NavLink}
                  to={item.path}
                  activeclasscame="active"
                  sx={{ textTransform: 'none', fontWeight: 'normal' }}
                >
                  {item.text}
                </Button>
              ))}

              {!loggedIn && menuItemsNotLoggedIn.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  component={NavLink}
                  to={item.path}
                  activeclasscame="active"
                  size="large"
                  sx={{ textTransform: 'none', fontWeight: 'normal' }}
                >
                  {item.text}
                </Button>
              ))}

              { loggedIn && currentUser &&
                <>
                  <IconButton
                    color="inherit"
                    aria-label="show account menu"
                    edge="end"
                    onClick={handleAccountMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {currentUser.username[0]}
                    </Avatar>
                  </IconButton>

                  <Menu
                    id="account-menu"
                    anchorEl={accountMenuOpen}
                    open={Boolean(accountMenuOpen)}
                    onClose={handleAccountMenuClose}
                  >
                    <MenuItem key={'2'} onClick={() => window.location.replace('/me')}>
                      My Profile
                    </MenuItem>
                    <MenuItem key={'3'} onClick={logoutHandler}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              }
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;