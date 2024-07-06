import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string; 
  authorId: string;
}

const MyPosts: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true); // Start loading

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get<{ userBlogs: Blog[] }>('https://backend.hasanraza102515209.workers.dev/api/v1/blog/user/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const sortedBlogs = response.data.userBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogs(sortedBlogs);
      } catch (error) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchBlogs();
  }, []);

  const handleUpdate = async (id: string) => {
    setIsLoading(true); // Start loading

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`https://backend.hasanraza102515209.workers.dev/api/v1/blog/update`, 
      {
        id,
        title: updatedTitle,
        content: updatedContent
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedBlog = response.data.updatedBlog;
        setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog));
        setEditingBlogId(null);
      } else {
        setError(response.data.message || 'An error occurred while updating the blog');
        setTimeout(() => setError(''), 2000);
      }
    } catch (error) {
      setError('There was an error updating the blog!');
      console.error("There was an error updating the blog!", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true); // Start loading

    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`https://backend.hasanraza102515209.workers.dev/api/v1/blog/delete`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else {
        setError(response.data.message || 'An error occurred while deleting the blog');
        setTimeout(() => setError(''), 2000);
      }
    } catch (error) {
      setError('There was an error deleting the blog!');
      console.error("There was an error deleting the blog!", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
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
      <main className="p-4 pt-0 mt-0">
        <div className="container mx-auto px-4 ">
          <h1 className="text-xl font-bold mb-4 pt-0">My Blog Posts</h1>
          {error && <p className="text-red-500">{error}</p>}
          {isLoading && <p className="text-gray-600">Loading...</p>} {/* Loading indicator */}
          <div className="p-4">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                {editingBlogId === blog.id ? (
                  <div>
                    <input 
                      type="text" 
                      defaultValue={blog.title}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                    />
                    <textarea 
                      defaultValue={blog.content}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                      rows={5}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                    />
                    <button 
                      onClick={() => handleUpdate(blog.id)}
                      className="bg-blue-500 text-white rounded-md p-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600">{formatDate(blog.date)}</p>
                    <p className="text-gray-800">{blog.content}</p>
                    <button 
                      onClick={() => {
                        setEditingBlogId(blog.id);
                        setUpdatedTitle(blog.title);
                        setUpdatedContent(blog.content);
                      }}
                      className="bg-yellow-500 text-white rounded-md p-2 mt-2"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-500 text-white rounded-md p-2 mt-2 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPosts;
