import React, { useEffect, useState } from 'react';
import Navbar from './core/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ContentRenderer from './core/ContentRenderer';
import { Description } from '@mui/icons-material';

interface BlogPost {
  title: string;
  description: string;
  content: string;
  cover_image: string;
}
interface RecentBlog {
  title: string;
  description: string;
  id: number;
}

const BlogContent: React.FC = () => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { blog_id } = useParams<{ blog_id: string }>();

  const fetchRecentBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setRecentBlogs(response.data.blogs || []);
    } catch (err) {
      console.error('Error fetching recent blogs:', err);
    }
  };

  const fetchBlogContent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/${blog_id}`);
      console.log(response.data); // To verify the structure of the response
      setBlog(response.data.blog); // Access the `blog` key inside the response
    } catch (err) {
      setError('Failed to fetch blog content. Please try again later.');
      console.error('Error fetching blog content:', err);
    }
  };
  

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBlogContent(), fetchRecentBlogs()])
      .finally(() => setLoading(false));
  }, [blog_id]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <Navbar />
        <>
          <div className="my-20 w-full flex flex-row justify-evenly">
            {/* Blog Content */}
            <div className="gap-3 grid w-full lg:flex-row lg:w-2/3">
              <img
                src={blog?.cover_image} // Replace with blog.cover_image
                className="mx-auto rounded-lg w-11/12 mb-5"
              />

              <div className="px-5 md:px-10">
                <ContentRenderer content={blog?.content || ''} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-[#000000] mt-3 text-[#fefffe] h-96 rounded-3xl flex-col w-4/12 md:w-3/12 mr-2 hidden lg:flex p-4">
              <h3 className="text-center text-3xl font-bold">Recent Posts</h3>
              <ul className="flex flex-col m-3 gap-2 mt-5 text-lg">
                {recentBlogs.length > 0 ? (
                  recentBlogs.slice(0, 7).map((recentBlog) => (
                    <li key={recentBlog.id} className="hover:underline">
                      <Link to={`/blog/${recentBlog.id}`}>{recentBlog.title}</Link>
                    </li>
                  ))
                ) : (
                  <p>No blogs available.</p>
                )}
              </ul>
            </div>
          </div>
        </>
    </div>
  );
};

export default BlogContent;
