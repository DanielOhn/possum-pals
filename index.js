const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

const PORT = process.env.PORT || 5001;
const path = require('path');
//process.env.PORT
// process.env.NODE_ENV => productin or undefined


// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    // server static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
    //app.use(express.static("./client/build"));
}

// Routes
//Create
app.post('/posts', async (req, res) => {
    //await
    try {
        const { text } = req.body;
        const newPost = await pool.query('INSERT INTO posts (text) VALUES ($1) RETURNING *', [text]);

        res.json(newPost.rows[0]);
    } catch (err) {
        console.log(err);
    }
});

// Edit
app.put('/posts/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const { updateText } = req.body;

        const updatePost = await pool.query('UPDATE posts SET text = $1 WHERE post_id = $2', [updateText, post_id]);

        res.json("Post was updated");
    } catch (err) {
        console.log(err.message);
    }
})

// Delete
app.delete('/posts/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const deletePost = await pool.query("DELETE FROM posts WHERE post_id = $1", [post_id]);

        res.json("Post was deleted.")
    } catch (err) {
        console.log(err.message);
    }
})

// Get single
app.get('/posts/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { post_id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [post_id]);

        res.json(post);
    } catch {
        console.log(err.message);
    }
})

// Get all
app.get('/posts', async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * from posts");
        res.json(allPosts.rows);
    } catch (err) {
        console.log(err.message);
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});

