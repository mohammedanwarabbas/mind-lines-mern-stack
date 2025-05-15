import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from './../../config'
import {toast} from "react-toastify";
import { Box,Button,Container,TextField,Typography,Paper,} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '@mui/material/styles';

function Login() {
  const theme = useTheme();
  const { setAuthData, user } = useAuth();
  const [formData, setFormData] = useState({username:"",password:""})
  const navigate = useNavigate();

  const handleChange = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      setAuthData(res.data.user, res.data.token); // Store in context not localstorage
      navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/writer/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "login failed")
    }
  };


  return (
    <>
    {user? (
navigate(user.role === 'admin' ? '/admin/dashboard' : '/writer/dashboard')
    ):(
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 8, width:{xs:'100%',md:'100%'} }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login as Writer/Admin
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size='large'
            startIcon={<LoginIcon />}
            sx={{ mt: 3, mb: 2, color:theme.palette.primary.contrastText, backgroundColor:theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
          >
            Login
          </Button>
          <Typography align="center">
            Don't have an account? <Link to="/register">register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
    )}
    </>
  );
}

export default Login;