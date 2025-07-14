import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../services/postService';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost(id).then(res => setPost(res.data));
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            {post.featuredImage && <img src={post.featuredImage} alt="cover" className="my-4 max-w-md" />}
            <p>{post.content}</p>
        </div>
    );
}
