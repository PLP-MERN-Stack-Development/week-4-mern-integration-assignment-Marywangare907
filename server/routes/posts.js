const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

const auth = require('../middleware/authMiddleware');

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('category');
  res.json(posts);
});

// Get single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category');
  res.json(post);
});

// Create post
router.post('/',
  body('title').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  }
);

// Update post
router.put('/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

// Delete post
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
