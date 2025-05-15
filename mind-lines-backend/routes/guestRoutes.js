const express = require("express");
const router = express.Router();
const {getAllQuotes} = require("../controllers/guestController");

// GET /api/guest/quotes (for home page)
router.get("/quotes", getAllQuotes);

module.exports = router;