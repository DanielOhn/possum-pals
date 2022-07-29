const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

const PORT = process.env.PORT || 5002;
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
// Create
app.post('/posts', async (req, res) => {
    //await
    try {
        const { text, file } = req.body;

        const time = await pool.query('SELECT LOCALTIMESTAMP');
        const { localtimestamp } = time.rows[0];

        const newPost = await pool.query('INSERT INTO posts(text, created, file) VALUES ($1, $2, $3) RETURNING *', [text, localtimestamp, file]);

        res.json(newPost.rows[0]);
    } catch (err) {
        console.log(err);
    }
});

// Edit
app.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { updateText } = req.body;


        const updatePost = await pool.query('UPDATE posts SET text = $1 WHERE id = $2', [updateText, id]);

        res.json("Post was updated");
    } catch (err) {
        console.log(err.message);
    }
})

// Delete
app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await pool.query("DELETE FROM posts WHERE id = $1", [id]);

        res.json("Post was deleted.")
    } catch (err) {
        console.log(err.message);
    }
})

// Get single
app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

        res.json(post.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// Get all
app.get('/posts', async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");

        res.json(allPosts.rows);
    } catch (err) {
        console.log(err.message);
    }
})

// Comments Routes
app.post('/comments', async (req, res) => {
    try {
        const { text, file, parent } = req.body;

        const time = await pool.query("SELECT LOCALTIMESTAMP");
        const { localtimestamp } = time.rows[0];

        const newComment = await pool.query('INSERT INTO comments(text, created, file, parent) VALUES ($1, $2, $3, $4) RETURNING *', [text, localtimestamp, file, parent]);
        res.json(newComment.rows[0]);
    } catch (err) {
        console.log(err);
    }
})

// List Comments
app.get('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allComments = await pool.query("SELECT * FROM comments WHERE parent = $1", [id]);

        res.json(allComments.rows);
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

