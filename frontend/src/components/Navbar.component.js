import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
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


const Navbar = ({ showSearchBar=false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(null);
  const [searchValue, setSearchValue] = useState(null)
  const [loggedIn, setLoggedIn] = useState(true)

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
    { text: 'All Blogs', path: '/' },
    { text: 'My Blogs', path: '/posts/me' },
    { text: 'My Profile', path: '/profiles/me' }
  ];

  const menuItemsNotLoggedIn = [
    { text: 'All Blogs', path: '/' },
    { text: 'Sign Up', path: '*' },
    { text: 'Login', path: '*' },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Typography variant="h6" component="div">
          Mathematical Blog App
        </Typography>

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
              // sx={{ '& .MuiDrawer-paper': { width: '70%' } }}
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
                  <Search underline={true} />
                </ListItem>}
                
                {loggedIn && menuItemsLoggedIn.map((item) => (
                  <>
                    <ListItem
                      key={item.text}
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
                  </>
                ))}

                {!loggedIn && menuItemsNotLoggedIn.map((item) => (
                  <>
                    <ListItem
                      key={item.text}
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
                  </>
                ))}

                {loggedIn && <>
                  <ListItem
                    key={'logout'}
                    onClick={handleMobileMenuClose}
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
            {showSearchBar && <Search />}

            <Box>
              {loggedIn && menuItemsLoggedIn.map((item) => (
                <Button
                  key={item.text}
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
                  key={item.text}
                  color="inherit"
                  component={NavLink}
                  to={item.path}
                  activeclasscame="active"
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
                    <MenuItem onClick={() => console.log('My Profile clicked')}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={() => console.log('Logout clicked')}>
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