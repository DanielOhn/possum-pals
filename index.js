const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

const aws = require('aws-sdk');

const credentials = new aws.SharedIniFileCredentials({profile: 'default'});
aws.config.credentials = credentials;
aws.config.region = process.env.S3_REGION;

const PORT = process.env.PORT || 5002;
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
// Create
app.post('/posts', async (req, res) => {
    //await
    try {
        const { text, file } = req.body;

        const time = await pool.query('SELECT LOCALTIMESTAMP');
        const { localtimestamp } = time.rows[0];

        const newPost = await pool.query('INSERT INTO posts(text, created, file, updated) VALUES ($1, $2, $3, $4) RETURNING *', [text, localtimestamp, file, localtimestamp]);

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

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts ORDER BY updated DESC");
        const comments = await pool.query("SELECT DISTINCT ON (parent) id, text, created, parent, file FROM comments");

        const result = {posts: allPosts.rows, comments: comments.rows}
        res.json(result);
    } catch (err) {
        console.log(err.message);
    }
})

// Comments Routes
// Create Comment
app.post('/comments', async (req, res) => {
    try {
        const { text, file, parent } = req.body;

        const time = await pool.query("SELECT LOCALTIMESTAMP");
        const { localtimestamp } = time.rows[0];

        const newComment = await pool.query('INSERT INTO comments(text, created, file, parent) VALUES ($1, $2, $3, $4) RETURNING *', [text, localtimestamp, file, parent]);
        const updatePost = await pool.query('UPDATE posts SET updated = $1 WHERE id = $2', [localtimestamp, parent]);

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

// AWS S3 Bucket
app.get('/sign-s3', (req, res) => {
    const fileName = req.query.fileName;
    const fileType = req.query.fileType;

    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 6000,
        ContentType: fileType,
        ACL: 'public-read'
    };

    try {
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.error(err);
                return res.end();
            }

            const returnData = {
                signedRequest: data,
                url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };

            res.json(returnData);
        })
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

