const Quote = require('../models/Quote');
const User = require('../models/User');

// @desc    Get all quotes (admin view)
// @route   GET /api/admin/quotes
// @access  Private (Admin)
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate('author', 'username') // Include writer's username
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: quotes.length,
      quotes
    });

  } catch (err) {
    res.status(500).json({ errorMessage: 'Failed to fetch quotes' });
  }
};

// @desc    Get all writers
// @route   GET /api/admin/writers
// @access  Private (Admin)
exports.listWriters = async (req, res) => {
  try {
    const writers = await User.find({ role: 'writer' })
      .select('-password') // Exclude passwords
      .sort({ username: 1 });

    const writersWithQuoteCounts = await Promise.all(
      writers.map(async (writer) => {
        const quoteCount = await Quote.countDocuments({ author: writer._id });
        return {
          ...writer.toObject(), // convert Mongoose document to plain object
          quoteCount
        };
      })
    );

    res.status(200).json({
      count: writers.length,
      writers: writersWithQuoteCounts
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Failed to fetch writers' });
  }
};

// @desc    Delete any quote (admin power)
// @route   DELETE /api/admin/quotes/:id
// @access  Private (Admin)
exports.deleteAnyQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({ errorMessage: 'Quote not found' });
    }

    res.status(200).json({ 
      message: 'Quote deleted by admin',
      deletedQuote: quote.quoteText // Return deleted content for confirmation
    });

  } catch (err) {
    res.status(500).json({ errorMessage: 'Failed to delete quote' });
  }
};

// @desc    get data for admin dashboard
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.stats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      totalQuotes: await Quote.countDocuments(),
      todayQuotes: await Quote.countDocuments({
        createdAt: { $gte: today },
      }),
      totalWriters: await User.countDocuments({
        role:'writer',
      }),
      todayWriters: await User.countDocuments({
        role:'writer',
        createdAt: { $gte: today },
      }),
    };
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error fetching stats", error });
  }
};