const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Set this environment variable to your Heroku Postgres connection string
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(cors()); // Allow all origins for simplicity. Refine for production.
app.use(express.json());

// API endpoint to fetch all posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM forum_posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
