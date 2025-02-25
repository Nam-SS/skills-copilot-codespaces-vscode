// Create web server and connect to MongoDB
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comments = require('./Comments');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Get all comments
app.get('/comments', (req, res) => {
    Comments.find({}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(comments);
        }
    });
});

// Add a new comment
app.post('/comments', (req, res) => {
    const comment = new Comments({
        name: req.body.name,
        comment: req.body.comment,
    });

    comment.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(comment);
        }
    });
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    Comments.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Comment deleted successfully' });
        }
    });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    Comments.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            comment.name = req.body.name;
            comment.comment = req.body.comment;

            comment.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(comment);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});