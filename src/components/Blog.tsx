import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string; 
  authorId: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get<{ posts: Blog[] }>('https://backend.hasanraza102515209.workers.dev/api/v1/blog/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const sortedBlogs = response.data.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogs(sortedBlogs);
      } catch (error) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const [time, ampm] = formattedTime.split(' ');
    return `${formattedDate}, ${time} ${ampm.toUpperCase()}`;
  };

  return (
    <div className="App">
      <main className="p-4 pt-1">
        <div className="container mx-auto px-2">
          <h1 className="text-2xl font-bold ">Blogs</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="p-4">
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <div key={blog.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600">{formatDate(blog.date)}</p>
                  <p className="text-gray-800">{blog.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Loading...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
