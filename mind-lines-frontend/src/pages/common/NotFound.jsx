import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      px={2}
      bgcolor="#e3f2fd"
    >
      <Box
        component={motion.div}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <SearchX size={96} strokeWidth={1.5} color="#1565c0" />
      </Box>

      <Typography variant="h3" fontWeight={700} mt={3} color="#0d47a1">
        404 - Page Not Found
      </Typography>

      <Typography variant="h6" color="textSecondary" mt={1} maxWidth="500px">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/')}
        sx={{ mt: 4, textTransform: 'none', borderRadius: 2, px: 4 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
