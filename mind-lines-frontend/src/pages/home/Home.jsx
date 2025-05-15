import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_BASE_URL} from './../../config'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Divider,
  Skeleton,
  Alert,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/guest/quotes`);
        // Sort by createdAt descending (newest first)
        const sortedQuotes = res.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setQuotes(sortedQuotes);
      } catch (err) {
        console.error('Failed to fetch quotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
         <Typography sx={{ letterSpacing:'0',textAlign:'center',color:'black',padding:0,margin:0,fontSize:{xs:'1rem',sm:'1.5rem'}}}>🅼🅸🅽🅳 🅻🅸🅽🅴🆂: 🆈🅾🆄🆁 🅿🅻🅰🆃🅵🅾🆁🅼 🆃🅾 🅲🆁🅴🅰🆃🅴 🅰🅽🅳 🆂🅷🅰🆁🅴 🅼🅴🅰🅽🅸🅽🅶🅵🆄🅻 🆀🆄🅾🆃🅴🆂</Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        Latest Quotes
      </Typography>
      
      {loading ? (
        <Stack spacing={2}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rounded" height={120} />
          ))}
        </Stack>
      ) : quotes.length > 0 ? (
        <Stack spacing={4}>
          {quotes.map((quote) => (
            <Card key={quote._id} elevation={3} sx={{overflow:'visible',position:'relative',backgroundColor:'grey.200',border:'1px dashed grey'}}>
              <CardContent sx={{paddingTop:{md:'2rem'}}}>
              <Box sx={{textAlign:'center'}}>
                <FormatQuoteIcon sx={{position:'absolute',top:0,left:'0%', transform:'translate(-50%,-50%)', fontSize:{xs:'4rem',sm:'4rem'},color:'primary.main'}} />
                <Typography variant="body1" paragraph sx={{ overflowWrap:'break-word',fontStyle: 'italic' }}>
                {quote.quoteText}
                </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Posted by: {quote.author?.username || 'Unknown'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(quote.createdAt), 'MMM dd, yyyy - h:mm a')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Alert severity="info">No quotes found. Be the first to share!</Alert>
      )}
    </Container>
  );
}