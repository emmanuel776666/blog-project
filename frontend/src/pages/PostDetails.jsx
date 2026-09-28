import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../services/api';

import './PostDetails.css';

function PostDetails() {

    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {

        const getPost = async () => {

            try {

                const data = await api(`/posts/${id}`);

                setPost(data.post);

            } catch (error) {

                console.error(error.message);

            }
        };

        getPost();

    }, [id]);

    if (!post) {
        return (
            <main className="post-details-page">
                <p className="post-loading">
                    Loading...
                </p>
            </main>
        );
    }

    return (
        <main className="post-details-page">

            <article className="post-details">

                {post.image && (
                    <img
                        className="post-details-image"
                        src={post.image}
                        alt={post.title}
                    />
                )}

                <div className="post-details-content">

                    <Link
                        className="back-link"
                        to="/"
                    >
                        ← Back to Home
                    </Link>

                    <h1>{post.title}</h1>

                    <div className="post-details-author">

                        <span>
                            By {post.author?.name}
                        </span>

                        <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>

                    </div>

                    <div className="post-details-text">
                        <p>
                            {post.content}
                        </p>
                    </div>

                </div>

            </article>

        </main>
    );
}

export default PostDetails;