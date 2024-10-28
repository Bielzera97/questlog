import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    };
    if (id) fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author }),
    });
    router.push('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 mb-2 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="border p-2 mb-2 w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Update</button>
      </form>
    </div>
  );
}
