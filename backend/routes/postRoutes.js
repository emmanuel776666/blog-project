const express = require('express');
const router = express.Router();

const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController');

const {
    protect,
    adminOnly
} = require('../middleware/authMiddleware');

router.post('/', protect, adminOnly, createPost);

router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', protect, adminOnly, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);
module.exports = router;