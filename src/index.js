require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search.routes');

const app = express();
app.use(express.json());

app.use('/search', searchRoutes);

const PORT = process.env.PORT || 4002;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Search Service connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Search Service running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
