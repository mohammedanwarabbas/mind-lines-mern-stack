import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, useTheme,Button } from "@mui/material";
import {
  LibraryBooks as TotalQuotesIcon,
  Today as TodayQuotesIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from './../../components/ui/Loader'
const WriterDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalQuotes: 0,
    todayQuotes: 0,
  });

  useEffect(() => {
    // Fetch writer's stats from backend
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/writer/stats`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(response.data);
      } catch (error) {
        toast.error(error.response?.data?.errorMessage || "Failed to fetch stats");
      } finally{
        setLoading(false)
      }
    };
    fetchStats();
  }, []);

  return (
  <>
  {loading? (<Loader/>
  ):(
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Card 1: Total Quotes */}
      <Grid item xs={12} md={6} sx={{width:{xs:'100%',md:'40%'}}}>
          <Card
            sx={{
              bgcolor: theme.palette.primary.light,
              color: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
            >
            <CardContent>
              <TotalQuotesIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Quotes Published</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {stats.totalQuotes}
              </Typography>
              <Button onClick={() => navigate("/writer/my-quotes/")}
                             variant="contained" 
                             backgroundColor={theme.palette.primary.dark}
                             endIcon={<ArrowForwardIosIcon />}
                >View my Quotes
              </Button>
</Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Quotes Submitted Today */}
      <Grid item xs={12} md={6} sx={{width:{xs:'100%',md:'40%'}}}>
          <Card
            sx={{
              bgcolor: theme.palette.secondary.light,
              color: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
            >
            <CardContent>
              <TodayQuotesIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Quotes Submitted Today</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {stats.todayQuotes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
          )
        }
          
    </>
  );
};

export default WriterDashboard;