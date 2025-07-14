import { useState } from 'react';
import { createPost } from '../services/postService';
import { useNavigate } from 'react-router-dom';

export default function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('featuredImage', image);

        await createPost(formData);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full mb-2 p-2 border"
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full mb-2 p-2 border"
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                className="mb-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2">Post</button>
        </form>
    );
}

