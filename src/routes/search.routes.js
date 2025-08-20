const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// 🔍 Search by name, description, or category
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query param 'q' is required" });
    }

    const regex = new RegExp(q, "i"); // case-insensitive search
    const results = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex }
      ]
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
