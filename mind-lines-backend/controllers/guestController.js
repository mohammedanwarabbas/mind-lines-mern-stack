const Quote = require("../models/Quote");

// Fetch all quotes (public access)
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().populate("author", "username");
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ errorMessage: "Failed to fetch quotes", error });
  }
};