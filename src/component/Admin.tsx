import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  const logout = () => {
    setLoading2(true);
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };


  const getBlogs = () => {
    setLoading(true); // Set loading state to true when fetching data
    setError(''); // Reset error state before fetching
    axios.get(`http://localhost:5000/blogs?user_id=${userId}`)
      .then((response) => {
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load blogs'); // Set error message if request fails
        setLoading(false); // Stop loading when there is an error
      });
  };

  return (
    <div className="min-h-screen p-4 mt-20 text-white">
      <h1 className="text-4xl font-bold mb-10 flex justify-between items-center">
        Admin Dashboard
        <button
          onClick={logout}
          className="bg-blue-500 text-lg  hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-300 ease-in-out disabled:opacity-50"
          disabled={loading}
        >
          {loading2 ? 'Loading...' : 'LogOut'}
        </button>
      </h1>



      <button
        onClick={getBlogs}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Blogs'}
      </button>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="list-disc ml-5">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <li key={blog.id} className='list-decimal text-xl m-2'>
              <li className='list-none'>
                <div className="text-lg">blog_id:{blog.id}</div>
                <div className="text-lg">{blog.title}</div>
              </li>
            </li>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </ul>

    </div>
  );
};

export default Admin;
