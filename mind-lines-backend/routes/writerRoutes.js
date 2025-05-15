const express = require('express');
const router = express.Router();
const { 
  createQuote,
  getMyQuotes,
  updateMyQuote,
  deleteMyQuote,
  stats,
} = require('../controllers/writerController');
const { authenticate,isWriter} = require('../middlewares/authMiddleware');

// Protected routes (require JWT + writer role)
router.use(authenticate,isWriter);

// GET /api/writer/my-quotes (List writer's own quotes)
router.get('/my-quotes', getMyQuotes);

// POST /api/writer/quotes (Create new quote)
router.post('/quotes', createQuote);

// PATCH /api/writer/quotes/:id (Update own quote)
router.patch('/quotes/:id', updateMyQuote);

// DELETE /api/writer/quotes/:id (Delete own quote)
router.delete('/quotes/:id', deleteMyQuote);

// GET /api/writer/stats (Get writer's dashboard stats)
router.get("/stats",stats); 

module.exports = router;