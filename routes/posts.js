const pool = require("../db");

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
        console.log(req.params);
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

        res.json(post);
    } catch {
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