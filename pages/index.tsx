import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  // Fetch posts from the API
  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  const deletePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts(); // Refresh posts after deletion
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={() => router.push('/create')}
      >
        Create New Post
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <small>By: {post.author}</small>
            <div className="mt-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
                onClick={() => router.push(`/edit/${post._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
