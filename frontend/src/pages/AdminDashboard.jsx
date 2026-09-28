import { useEffect, useState } from 'react';

import api from '../services/api';

import './AdminDashboard.css';

function AdminDashboard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const [posts, setPosts] = useState([]);

    const [editingPost, setEditingPost] = useState(null);

    const getPosts = async () => {
        try {

            const data = await api('/posts');

            setPosts(data.posts);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editingPost) {

                await api(`/posts/${editingPost._id}`, {
                    method: 'PUT',

                    body: JSON.stringify({
                        title,
                        content,
                        image
                    })
                });

                setEditingPost(null);

            } else {

                await api('/posts', {
                    method: 'POST',

                    body: JSON.stringify({
                        title,
                        content,
                        image
                    })
                });
            }

            setTitle('');
            setContent('');
            setImage('');

            getPosts();

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {

            await api(`/posts/${id}`, {
                method: 'DELETE'
            });

            getPosts();

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
        setImage(post.image || '');
    };

    return (
        <main className="admin-page">

            <div className="admin-container">

                <div className="admin-header">
                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage your blog posts from here.
                    </p>
                </div>

                <section className="admin-form-section">

                    <h2>
                        {editingPost ? 'Edit Post' : 'Create New Post'}
                    </h2>

                    <form
                        className="admin-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="admin-form-group">

                            <label>Title</label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter post title"
                            />

                        </div>

                        <div className="admin-form-group">

                            <label>Content</label>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your post content"
                            />

                        </div>

                        <div className="admin-form-group">

                            <label>Image URL</label>

                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Enter image URL"
                            />

                        </div>

                        <button
                            className="admin-submit-button"
                            type="submit"
                        >
                            {editingPost ? 'Update Post' : 'Create Post'}
                        </button>

                    </form>

                </section>

                <section className="admin-posts-section">

                    <h2>All Posts</h2>

                    <div className="admin-posts">

                        {posts.map((post) => (

                            <article
                                className="admin-post"
                                key={post._id}
                            >

                                <div className="admin-post-info">

                                    <h3>{post.title}</h3>

                                    <p>
                                        {post.content}
                                    </p>

                                    <small>
                                        By {post.author?.name}
                                    </small>

                                </div>

                                <div className="admin-post-actions">

                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(post)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            </div>

        </main>
    );
}

export default AdminDashboard;