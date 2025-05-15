import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      px={2}
      bgcolor="#fff3e0"
    >
      <Box
        component={motion.div}
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <LockKeyhole size={96} strokeWidth={1.5} color="#ef6c00" />
      </Box>

      <Typography variant="h3" fontWeight={700} mt={3} color="#bf360c">
        401 - Unauthorized
      </Typography>

      <Typography variant="h6" color="textSecondary" mt={1} maxWidth="500px">
        You don’t have permission to access this page. Please log in or contact the administrator.
      </Typography>

      <Button
        variant="contained"
        color="warning"
        size="large"
        onClick={() => navigate('/login')}
        sx={{ mt: 4, textTransform: 'none', borderRadius: 2, px: 4 }}
      >
        Go to Login
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
