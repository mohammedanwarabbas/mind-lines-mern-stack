import React, { useEffect, useState } from "react";
import {Box,Typography,useTheme,Stack,IconButton,Alert, AlertTitle, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AllQuotes = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

    // Fetch all quotes from backend
    const fetchQuotes = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/admin/quotes`,{
            headers: { Authorization: `Bearer ${user.token}` }
          });
          const transformed = res.data.quotes.map((quote, index) => ({
            id: quote._id, // used internally by DataGrid
            serial: index + 1,
            writer:quote.author.username,
            quoteText: quote.quoteText,
            createdAt: new Date(quote.createdAt).toLocaleString(),
          }));
          setRows(transformed);
          setLoading(false);
        } catch (err) {
          toast.error(err.response?.data?.errorMessage || 'Error fetching quotes');
          setLoading(false);
        }
      };

        // Delete quote
  const handleDelete = async (id) => {
    try {
        setLoading(true)
      let res = await axios.delete(`${API_BASE_URL}/api/admin/quotes/${id}`,{
        headers: { Authorization: `Bearer ${user.token}` }
      });
    fetchQuotes();  
    toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.errorMessage || 'Error deleting quote');
    } finally{
        setLoading(false)
    }
  };

  // Fetch all quotes
  useEffect(() => {
    fetchQuotes();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S. No.', width: 90 },
    { field: 'writer', headerName: 'writer', width: 200,},
    { field: 'quoteText', headerName: 'Quote', width: 400,
      renderCell:(params)=>(
        <span style={{fontStyle:'italic'}}>{'"'+params.value+'"'}</span>
      )
    },
    { field: 'createdAt', headerName: 'Created At', width: 200,},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
      ),
    },
  ];

return(
<>
<Container maxWidth="xl" sx={{ py: 4 }}>

           <Typography variant="h5" sx={{color:theme.palette.primary.dark,my:'1rem',textAlign:'center'}}>All Quotes</Typography>
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
            <Typography variant="body2" color="textSecondary">
             written by: {row.writer}
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap:'break-word',textAlign:'center',fontStyle:'italic' }}>{'"'+row.quoteText+'"'}</Typography>
              <Box sx={{textAlign:'center'}}>
              <IconButton
              sx={{backgroundColor:theme.palette.primary.dark,color:'white'}}
              size="small"
              onClick={() => handleDelete(row.id)}
              >
                <DeleteIcon />
              </IconButton>
                  </Box>
          </Box>
        ))}
      </Stack>
    </Box>

</Container>
</>
)
};

export default AllQuotes;