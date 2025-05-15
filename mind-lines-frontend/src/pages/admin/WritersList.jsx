import React, { useEffect, useState } from "react";
import {Box,Typography,useTheme,Stack,IconButton,Alert, AlertTitle, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WritersList = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

    // Fetch all quotes from backend
    const fetchQuotes = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/admin/writers`,{
            headers: { Authorization: `Bearer ${user.token}` }
          });
          const transformed = res.data.writers.map((writer, index) => ({
            id: writer._id, // used internally by DataGrid(foe edit delete etc for our purpose)
            serial: index + 1,
            writer:writer.username,
            quoteCount: writer.quoteCount,
            createdAt: new Date(writer.createdAt).toLocaleString(),
          }));
          setRows(transformed);
          setLoading(false);
        } catch (err) {
          toast.error(err.response?.data?.errorMessage || 'Error fetching quotes');
          setLoading(false);
        }
      };

  // Fetch all quotes
  useEffect(() => {
    fetchQuotes();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S. No.', width: 90 },
    { field: 'writer', headerName: 'writer', width: 200,},
    { field: 'quoteCount', headerName: 'Total Quotes', width: 400,},
    { field: 'createdAt', headerName: 'Joined on', width: 200,},
  ];

return(
<>
<Container maxWidth="xl" sx={{ py: 4 }}>

           <Typography variant="h5" sx={{color:theme.palette.primary.dark,my:'1rem',textAlign:'center'}}>All Registered Writers</Typography>
      {/* Desktop/Laptop view */}

      <Box sx={{ display: { xs: 'none', md: 'block'},p: 3,width:'100%',overflowX:'auto' }}>
      <DataGrid showToolbar sx={{minWidth: '100%',height:'auto',textAlign:'center',borderRadius:2,border:'1px solid grey'}}
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        disableRowSelectionOnClick
        />
        </Box>



{/* Mobile scrren views xs,sm */}
<Box sx={{ display: { xs: 'block', md: 'none' }}}>
      <Alert severity="warning" sx={{my:2}}>
        <AlertTitle>Warning</AlertTitle>
        use larger screen to access advanced features
        </Alert>
      <Stack spacing={2} maxWidth={{xs:'100%',sm:'80%'}} xs={{display:'flex',justifyContent:'center',alignItems:'center'}} mx="auto">
        {rows.map((row) => (
          <Box
            key={row.id}
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              S. No. {row.serial}
            </Typography>
            <Typography variant="h5" sx={{color:'black',textTransform:'capitalize'}}>
             {row.writer}
            </Typography>
            <Typography variant="body2" color="textSecondary">
             joined on: {row.createdAt}
            </Typography>
            <Typography variant="body2" color="textSecondary">
             total quotes submitted: {row.quoteCount}
            </Typography>
           </Box>
        ))}
      </Stack>
    </Box>

</Container>
</>
)
};

export default WritersList;