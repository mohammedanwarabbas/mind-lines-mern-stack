const express = require('express');
const router = express.Router();
const { 
  getAllQuotes,
  listWriters,
  deleteAnyQuote,
  stats
} = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Protected routes (require JWT + admin role)
router.use(authenticate, isAdmin);

// GET /api/admin/quotes (List all quotes)
router.get('/quotes', getAllQuotes);

// GET /api/admin/writers (List all writers)
router.get('/writers', listWriters);

// DELETE /api/admin/quotes/:id (Delete any quote)
router.delete('/quotes/:id', deleteAnyQuote);

// GET /api/admin/stats (Get admin's dashboard stats)
router.get("/stats",stats); 


module.exports = router;