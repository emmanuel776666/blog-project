import { Link } from 'react-router-dom';

import './PostCard.css';

function PostCard({ post }) {

    return (
        <article className="post-card">

            {post.image && (
                <img
                    className="post-card-image"
                    src={post.image}
                    alt={post.title}
                />
            )}

            <div className="post-card-content">

                <h2>{post.title}</h2>

                <p>
                    {post.content.length > 150
                        ? `${post.content.substring(0, 150)}...`
                        : post.content}
                </p>

                <div className="post-card-bottom">

                    <small>
                        By {post.author?.name}
                    </small>

                    <Link to={`/posts/${post._id}`}>
                        Read More
                    </Link>

                </div>

            </div>

        </article>
    );
}

export default PostCard;