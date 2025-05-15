import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../../config'
import {toast} from "react-toastify";
import { Box,Button,Container,TextField,Typography,Paper,FormHelperText} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '@mui/material/styles';

function updateProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {user,logout} = useAuth();
  const [formData, setFormData] = useState({username:user.username,currentPassword:"",newPassword:"",confirmPassword:""})

  const handleChange = (e)=>{
    
    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData,[name]:value})
  }

  const handleUserNameSubmit = async (e) => {
    e.preventDefault();
   if(formData.username===user.username){
      toast.error("you didnt change username")
      return
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/update-profile`,
         {username:formData.username},{
         headers: {Authorization:`Bearer ${user.token}`},
         }
        );
      toast.success("username changed successfully")
      logout();
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "username couldn't be changed")
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if(formData.newPassword!==formData.confirmPassword){
      toast.error("new password and confirm password do not match")
      return
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/update-profile`,
         {currentPassword:formData.currentPassword,newPassword:formData.newPassword},{
         headers: {Authorization:`Bearer ${user.token}`},
         }
        );
      toast.success("password changed successfully")
      logout();
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "username couldn't be changed")
    }
  };


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, my: 4, width:{xs:'100%',md:'100%'} }}>
        <Typography variant="h5" align="center" gutterBottom>
          Change username
        </Typography>

        <Box component="form" onSubmit={handleUserNameSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username?formData.username:user.username}
            onChange={handleChange}
            required
          />
           <FormHelperText sx={{color:theme.palette.primary.dark}}>* username should be at least 3 characters.</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='warning'
            size='large'
            startIcon={<SendIcon />}
            sx={{ mt: 3, mb: 2, color:theme.palette.primary.contrastText, backgroundColor:theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
            change username
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 4, width:{xs:'100%',md:'100%'} }}>
        <Typography variant="h5" align="center" gutterBottom>
          Change password
        </Typography>

        <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mt: 2 }}>
        <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
           <FormHelperText sx={{color:theme.palette.primary.dark}}>* password should be at least 6 characters.</FormHelperText>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='warning'
            size='large'
            startIcon={<SendIcon />}
            sx={{ mt: 3, mb: 2, color:theme.palette.primary.contrastText, backgroundColor:theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
            change password
          </Button>
        </Box>
      </Paper>

      
    </Container>
  );
}

export default updateProfile;