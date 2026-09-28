import { useEffect, useState } from 'react';

import api from '../services/api';
import PostCard from '../components/PostCard';

import './Home.css';

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const getPosts = async () => {

            try {

                const data = await api('/posts');

                setPosts(data.posts);

            } catch (error) {

                console.error(error.message);

            }
        };

        getPosts();

    }, []);

    return (
        <main className="home-page">

            <section className="home-header">

                <h1>Welcome to My Blog</h1>

                <p>
                    Read the latest articles and learn something new.
                </p>

            </section>

            <section className="posts-container">

                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}

            </section>

        </main>
    );
}

export default Home;