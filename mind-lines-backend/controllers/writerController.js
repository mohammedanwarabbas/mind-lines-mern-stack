const Quote = require('../models/Quote');

// @desc    Get all quotes by the logged-in writer
// @route   GET /api/writer/my-quotes
// @access  Private (Writer)
exports.getMyQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ author: req.user.userId })
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      count: quotes.length,
      quotes
    });

  } catch (err) {
    res.status(500).json({ errorMessage: 'Failed to fetch quotes' });
  }
};

// @desc    Create a new quote
// @route   POST /api/writer/quotes
// @access  Private (Writer)
exports.createQuote = async (req, res) => {
  try {
    const { quoteText } = req.body;

    const quote = await Quote.create({
      quoteText,
      author: req.user.userId // Auto-attach writer's ID
    });

    res.status(201).json(quote);

  } catch (err) {
    res.status(400).json({ errorMessage: 'Invalid quote data' });
  }
};

// @desc    Update a writer's own quote
// @route   PATCH /api/writer/quotes/:id
// @access  Private (Writer)
exports.updateMyQuote = async (req, res) => {
  try {
    const { quoteText } = req.body;

    const quote = await Quote.findOneAndUpdate(
      { 
        _id: req.params.id, 
        author: req.user.userId // Ensures ownership
      },
      { quoteText },
      { new: true } // Return updated quote
    );

    if (!quote) {
      return res.status(404).json({ errorMessage: 'Quote not found or unauthorized' });
    }

    res.status(200).json({message:'Quote updated', quote});

  } catch (err) {
    res.status(500).json({ errorMessage: 'Failed to update quote' });
  }
};

// @desc    Delete a writer's own quote
// @route   DELETE /api/writer/quotes/:id
// @access  Private (Writer)
exports.deleteMyQuote = async (req, res) => {
  try {
    const quote = await Quote.findOneAndDelete({
      _id: req.params.id,
      author: req.user.userId // Ownership check
    });

    if (!quote) {
      return res.status(404).json({ errorMessage: 'Quote not found or unauthorized' });
    }

    res.status(200).json({ message: 'Quote deleted' });

  } catch (err) {
    res.status(500).json({ errorMessage: 'Failed to delete quote' });
  }
};

// @desc    get data for writer dashboard
// @route   GET /api/writer/stats
// @access  Private (Writer)
exports.stats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      totalQuotes: await Quote.countDocuments({ author: req.user.userId }),
      todayQuotes: await Quote.countDocuments({
        author: req.user.userId,
        createdAt: { $gte: today },
      }),
    };
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error fetching stats", error });
  }
};