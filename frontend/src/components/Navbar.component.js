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
    { id:13, text: 'My Profile', path: '/profiles/me' }
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
    }
  }, [])

  const logoutHandler = () => {
    setLoggedIn(false)
    localStorage.removeItem('access_token');
    window.location.href = '/';
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

              { loggedIn && 
                <>
                  <IconButton
                    color="inherit"
                    aria-label="show account menu"
                    edge="end"
                    onClick={handleAccountMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {'A'}
                    </Avatar>
                  </IconButton>

                  <Menu
                    id="account-menu"
                    anchorEl={accountMenuOpen}
                    open={Boolean(accountMenuOpen)}
                    onClose={handleAccountMenuClose}
                  >
                    <MenuItem key={'2'} onClick={() => console.log('My Profile clicked')}>
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