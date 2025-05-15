// components/common/QuoteEditorModal.jsx
import React, { useState,useEffect } from 'react'; // Import React and useState
import { TextField, Button, Stack } from '@mui/material'; // Import MUI components
import CommonModal from './Modal'; // Import CommonModal (adjust the import path if necessary)

const QuoteEditorModal = ({ open, handleClose, quoteDataObject, handleSave }) => {
  const [quoteText, setQuoteText] = useState(quoteDataObject?.quoteText || '');

  const onSave = () => {
    // Pass the entire quote object, including the ID
    handleSave({ ...quoteDataObject, quoteText });
    handleClose();
  };

  useEffect(() => {
    if (quoteDataObject) {
      setQuoteText(quoteDataObject.quoteText || ''); // Reset quoteText to new quote
    }
  }, [quoteDataObject]); 
  
  return (
    <CommonModal open={open} handleClose={handleClose} title="Edit Quote">
      <Stack spacing={2}>
        <TextField
          label="Quote"
          fullWidth
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
        />
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </Stack>
    </CommonModal>
  );
};

export default QuoteEditorModal; // Export the component to use elsewhere
