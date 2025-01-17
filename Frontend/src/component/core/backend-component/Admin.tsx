import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Blog {
  id: number;
  title: string;
  description: string;
  user_id: number;
}

const Admin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState('');
  const [blogId, setBlogId] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    setLoading2(true);
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  const getBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/admin/blogs?user_id=${userId}`);
      console.log(response.data.blogs);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error(error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (blogId) {
      setLoadingAction(true);
      navigate(`/admin/blogUpdate/${blogId}`);
    }
  };

  const handleDelete = () => {
    if (blogId) {
      setLoadingAction(true);
      navigate(`/admin/blogDelete/${blogId}`);
    }
  };

  const handleAdd = () => {
    setLoadingAction(true);
    navigate(`/admin/blogCreate`);
  };

  const handleTutorials = () => {
    setLoadingAction(true);
    navigate(`/admin/tutorials`);
  };

  const handleLanguages = () => {
    setLoadingAction(true);
    navigate(`/admin/languages`);
  };
  
  useEffect(() => {
    getBlogs();
  }, []);
  
  return (
    <div className="min-h-screen p-4 mt-20 text-white">
      <h1 className="text-4xl font-bold mb-10 flex justify-between items-center">
        Admin Dashboard
        <button
          onClick={logout}
          className="bg-blue-500 text-lg hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-300 ease-in-out disabled:opacity-50"
          disabled={loading2}
        >
          {loading2 ? 'Loading...' : 'LogOut'}
        </button>
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      <div className=" mb-4">
      <h2 className="text-2xl font-bold mb-4 mt-8">Manage Tutorial</h2>
      <div className="row m-2 flex gap-4">
        <button
          onClick={handleTutorials}
          className="bg-purple-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Tutorials'}
        </button>
        <button
          onClick={handleLanguages}
          className="bg-teal-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Languages'}
        </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Manage Blog Content</h2>
      <input
        type="number"
        value={blogId}
        onChange={(e) => setBlogId(e.target.value)}
        placeholder="Enter blog ID"
        className="w-full mb-4 bg-zinc-600 p-3"
      />
      <div className="row m-2 flex gap-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Add Blog'}
        </button>
        <button
          onClick={handleEdit}
          className="bg-amber-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Edit Blog'}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Delete Blog'}
        </button>
      </div>

      <div className="overflow-x-auto m-3">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Blog ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Title</th>
              </tr>
            </thead>
            <tbody>
              {blogs.reverse().map((blog: any) => (
                <tr key={blog.id} className="hover:bg-stone-600">
                  <td className="border border-gray-300 px-4 py-2">{blog.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-4">No blogs available.</p>
        )}
      </div>

    </div>
  );
};

export default Admin;
