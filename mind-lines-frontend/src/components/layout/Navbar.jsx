import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  AppBar, Box, Toolbar, IconButton, Typography, Menu, 
  Container, Avatar, Button, Tooltip, MenuItem
} from '@mui/material';
// import {Menu as MenuIcon,AdminPanelSettings as AdminPanelSettingsIcon, PersonOutline as PersonOutlineIcon} from '@mui/icons-material/';
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useTheme } from '@mui/material/styles';
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';

function Navbar() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Public menu items (visible to all)
  let publicPages = [
    { name: 'Home', path: '/' },
  ];
  // if user not logged in add login and register menus
  if(!user){
    publicPages = publicPages.concat([
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' }
    ])
  }

  // Writer-only menu items
  const writerPages = [
    { name: 'dashboard', path: '/writer/dashboard' },
    { name: 'My Quotes', path: '/writer/my-quotes' },
    { name: 'Write Quote', path: '/writer/write-quote' },
  ];

  // Admin-only menu items
  const adminPages = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'All Quotes', path: '/admin/all-quotes-list' },
    { name: 'Writers List', path: '/admin/all-writers-list' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseUserMenu();
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" sx={{backgroundColor:'rgba(55, 51, 58, 0.94)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <FormatQuoteOutlinedIcon sx={{fontSize:'4rem',transform:'rotateY(189deg) rotate(44deg)',color:theme.palette.primary.main, display: { xs: 'none', md: 'flex' } }} />
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              fontSize:'2.2rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
            }}
          >
           M̳̿͟͞i̳̿͟͞n̳̿͟͞d̳̿͟͞ ̳̿͟͞L̳̿͟͞i̳̿͟͞n̳̿͟͞e̳̿͟͞s̳̿͟͞
          </Typography>

          

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{backgroundColor:'rgba(255, 116, 46, 0.84)',borderRadius:'1rem'}}
            
            >
              <MenuIcon sx={{size:'large'}} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* Public links */}
              {publicPages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  component={Link} 
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}

              {/* Writer links */}
              {user?.role === 'writer' && writerPages.map((page) => (
                <MenuItem 
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}

              {/* Admin links */}
              {user?.role === 'admin' && adminPages.map((page) => (
                <MenuItem 
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <FormatQuoteOutlinedIcon sx={{fontSize:'3rem',transform:'rotateY(189deg) rotate(44deg)',color:theme.palette.primary.main, display: { xs: 'flex', md: 'none' } }} />
          <Typography
            variant='h5'
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '0rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              fontSize:'1.9rem',
            }}
          >
           M̳̿͟͞i̳̿͟͞n̳̿͟͞d̳̿͟͞ ̳̿͟͞L̳̿͟͞i̳̿͟͞n̳̿͟͞e̳̿͟͞s̳̿͟͞
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* Public links */}
            {publicPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ textAlign:'center',my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}

            {/* Conditional links */}
            {user?.role === 'writer' && writerPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ textAlign:'center',my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}

            {user?.role === 'admin' && adminPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ textAlign:'center',my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Avatar (conditional) */}
          {user ? (
            <Box sx={{ flexGrow: 0,display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column' }}>
              <Tooltip title="User menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{width:'3rem',height:'3rem'}} alt={user.username} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=eee&color=000`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '1rem'}}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  navigate('/auth/profile'); 
                }}>
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (<></>
            // <Box sx={{ flexGrow: 0 }}>
            //   <Button 
            //     component={Link} 
            //     to="/login" 
            //     color="inherit"
            //     variant="outlined"
            //     sx={{ ml: 2 }}
            //   >
            //     Loginq
            //   </Button>
            // </Box>
          )}
        </Toolbar>
        {user && 
        <Box sx={{display:'flex',justifyContent:'space-evenly'}}>
          <Typography sx={{textTransform:'capitalize'}}><PersonOutlineIcon sx={{fontSize:'2rem',verticalAlign:'bottom',color:theme.palette.primary.main}} />{user.username}</Typography>
          <Typography><AdminPanelSettingsIcon sx={{fontSize:'2rem',verticalAlign:'bottom',color:theme.palette.primary.main}} />role: {user.role}</Typography>
        </Box>
        }
      </Container>
    </AppBar>
  );
}

export default Navbar;