const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content, image } = req.body;

        const post = await Post.create({
            title,
            content,
            image,
            author: req.user.id
        });

        res.status(201).json({
            message: 'Post created successfully',
            post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email');

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json({
            post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { title, content, image } = req.body;

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                image
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json({
            message: 'Post updated successfully',
            post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json({
            message: 'Post deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost  
};
