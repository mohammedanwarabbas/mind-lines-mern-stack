import React, { useEffect, useState } from "react";
import {Box,Typography,useTheme,Stack,IconButton,Alert, AlertTitle,Fab,Tooltip, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import QuoteEditorModal from "../../components/common/QuoteEditorModal";
import { useNavigate } from "react-router-dom";

const MyQuotes = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuoteObject, setEditingQuoteObject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch writer's quotes from backend
    const fetchQuotes = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/writer/my-quotes`,{
            headers: { Authorization: `Bearer ${user.token}` }
          });
          const transformed = res.data.quotes.map((quote, index) => ({
            id: quote._id, // used internally by DataGrid
            serial: index + 1,
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
      let res = await axios.delete(`${API_BASE_URL}/api/writer/quotes/${id}`,{
        headers: { Authorization: `Bearer ${user.token}` }
      });
    //   setRows((prev) => prev.filter((row) => row.id !== id));
    fetchQuotes();  
    toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.errorMessage || 'Error deleting quote');
    } finally{
        setLoading(false)
    }
  };

    // Edit quote
  const handleEdit = (quoteObject) => {
    setEditingQuoteObject(quoteObject);
        setIsModalOpen(true);
  };

  const handleSave = async (updatedQuoteObj) => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/api/writer/quotes/${updatedQuoteObj.id}`, {
        quoteText: updatedQuoteObj.quoteText,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRows((prev) => prev.map((row) => (row.id === updatedQuoteObj.id ? { ...row, quoteText: updatedQuoteObj.quoteText } : row)))
      toast.success(res.data.message || 'Quote updated successfully');
      // Optionally: refetch the quotes or update local state
    } catch (err) {
      toast.error(err.response?.data?.errorMessage || 'Update failed');
    }
  };
  


  // Fetch writer's quotes
  useEffect(() => {
    fetchQuotes();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S. No.', width: 90 },
    { field: 'quoteText', headerName: 'Quote', width: 400,
renderCell:(params)=>{
  return (<span style={{fontStyle:"italic",}}>{'"'+params.value+'"'}</span>)
}
    },
    { field: 'createdAt', headerName: 'Created At', width: 200,},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)} // Pass entire row object (quote)
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

return(
<>
<Container maxWidth="xl" sx={{ py: 4 }}>

           <Typography variant="h5" sx={{color:theme.palette.primary.dark,my:'1rem',textAlign:'center'}}>All My Quotes</Typography>
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
<Box sx={{ display: { xs: 'block', md: 'none' } }}>
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
            <Typography sx={{ textAlign:'center', whiteSpace: 'pre-wrap', overflowWrap:'break-word',fontStyle: 'italic', }}>{'"'+row.quoteText+'"'}</Typography>
            <Stack direction="row" justifyContent={'space-around'} spacing={1} mt={1}>
              <IconButton
sx={{backgroundColor:theme.palette.primary.dark,color:'white'}}
                size="small"
                onClick={() => handleEdit(row)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
              sx={{backgroundColor:theme.palette.primary.dark,color:'white'}}
                size="small"
                onClick={() => handleDelete(row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>


<QuoteEditorModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        quoteDataObject={editingQuoteObject}
        handleSave={handleSave}
        />

<Tooltip title="Add New Quote" placement="left">
  <Fab
    color="primary"
    aria-label="add"
    onClick={() => navigate("/writer/write-quote")}
    sx={{
      position: 'fixed',
      bottom: { xs: 80, md: 80 },
      right: 24,
      zIndex: 999
    }}
  >
    <AddIcon />
  </Fab>
</Tooltip>
</Container>
</>





)
};

export default MyQuotes;