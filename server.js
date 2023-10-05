const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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
        const result = await pool.query('SELECT * FROM forum_posts');  // Assuming your table name is "forum_posts"
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.get('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    
    try {
      const result = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
      if (result.rows.length > 0) {
        res.json(result.rows[0].id);  // Sending back the user ID
      } else {
        res.status(404).send('Username not found');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
      res.status(500).send('Internal server error');
    }
  });

  app.get('/api/categories', async (req, res) => {
    try {
      const result = await pool.query('SELECT id, name FROM forum_categories');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('Internal server error');
    }
});
  
  
  app.post('/api/posts', async (req, res) => {
    console.log("Received request body:", req.body);

    // Destructure and convert to integer if they are strings
    const { user_id, forum_category_id, title, body } = req.body;
    const userIdInt = typeof user_id === 'string' ? parseInt(user_id) : user_id;
    const categoryIdInt = typeof forum_category_id === 'string' ? parseInt(forum_category_id) : forum_category_id;

    try {
        const result = await pool.query('INSERT INTO forum_posts (title, body, user_id, forum_category_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, body, userIdInt, categoryIdInt]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  

// Test API endpoint
app.get('/api/test', (req, res) => {
    console.log("API Test route hit");
    res.send('Hello World');
});

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'build')));

// Handles any requests that don't match the above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
