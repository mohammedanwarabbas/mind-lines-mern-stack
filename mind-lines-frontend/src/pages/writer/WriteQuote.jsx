import React, { useState } from "react";
import {Container,Typography,Box,Stack, TextField,Button,useTheme,} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WriteQuote = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quoteText, setQuoteText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quoteText.trim()) {
      toast.warning("Quote text cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/writer/quotes`,
        { quoteText },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(res.data.message || "Quote added successfully");
      setQuoteText(""); // Clear input after success
    } catch (err) {
      toast.error(err.response?.data?.errorMessage || "Failed to submit quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.primary.dark, textAlign: "center", mb: 3 }}
      >
        Write a New Quote
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          multiline
          rows={4}
          label="Write Your new Quote"
          variant="outlined"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          fullWidth
        />

<Stack spacing={2} direction={{ xs: "column", md: "row" }} justifyContent={"space-between"}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Quote"}
        </Button>
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/writer/my-quotes")}
          >
            View My All Quotes
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default WriteQuote;
