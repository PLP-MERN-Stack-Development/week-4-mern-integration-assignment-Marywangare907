import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = () => axios.get(`${API_URL}/posts`);
export const fetchPost = (id) => axios.get(`${API_URL}/posts/${id}`);
export const createPost = (data) => axios.post(`${API_URL}/posts`, data);
export const updatePost = (id, data) => axios.put(`${API_URL}/posts/${id}`, data);
export const deletePost = (id) => axios.delete(`${API_URL}/posts/${id}`);





src/pages/PostList.jsx 


import { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../services/postService';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Posts</h1>
      <Link to="/create" className="text-blue-500">+ New Post</Link>
      {posts.map(post => (
        <div key={post._id} className="p-4 border my-2">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p>{post.content.slice(0, 100)}...</p>
          <Link to={`/posts/${post._id}`} className="text-blue-600 mr-2">View</Link>
          <button onClick={() => handleDelete(post._id)} className="text-red-500">Delete</button>
        </div>
      ))}
    </div>
  );
}

