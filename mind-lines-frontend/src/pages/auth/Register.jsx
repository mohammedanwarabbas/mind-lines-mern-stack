import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from './../../config'
import {toast} from "react-toastify";
import { Box,Button,Container,TextField,Typography,Paper,FormHelperText} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '@mui/material/styles';

function Register() {
  const theme = useTheme();
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
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      
      toast.success("Successfully registered")
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "Registration failed")
    }
  };


  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 8, width:{xs:'100%',md:'100%'} }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register as a Writer
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
          <FormHelperText>username should be at least 3 characters.</FormHelperText>
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
           <FormHelperText>password should be at least 6 characters.</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='warning'
            size='large'
            startIcon={<SendIcon />}
            sx={{ mt: 3, mb: 2, color:theme.palette.primary.contrastText, backgroundColor:theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
            Register
          </Button>
          <Typography align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;