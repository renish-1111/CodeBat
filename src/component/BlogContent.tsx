import React, { useEffect, useState } from 'react';
import Navbar from './core/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ContentRenderer from './core/ContentRenderer';
import BlogSkeleton from './core/Skeleton/BlogSkeletol';

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

  // Fetch recent blogs
  const fetchRecentBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setRecentBlogs(response.data.blogs || []);
    } catch (err) {
      console.error('Error fetching recent blogs:', err);
    }
  };

  // Fetch single blog content
  const fetchBlogContent = async () => {
    try {
      const response = await axios.get(`/api/blogs/${blog_id}`);
      setBlog(response.data.blog); // Assuming the blog data is under `response.data.blog`
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

  // Show loading skeleton
  if (loading) {
    return <BlogSkeleton />;
  }

  // Show error message
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-white ">
      <Navbar />
      <div className="mx -auto container my-20 grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Blog Content */}
        <div className="lg:col-span-2 ">
          {blog?.cover_image && (
            <div className='mx-auto rounded-lg w-full mb-8 px-4'>
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="mx-auto rounded-lg w-full mb-8 "
              />
            </div>
          )}
          <div className="px-4">
            <ContentRenderer content={blog?.content || ''} />
          </div>
        </div>

        {/* Sidebar: Recent Blogs */}
        <div className="bg-black rounded-xl p-6 h-96 hidden lg:block">
          <h3 className="text-2xl font-bold text-center mb-6">Recent Posts</h3>
          <ul className="space-y-4">
            {recentBlogs.length > 0 ? (
              recentBlogs.slice(0, 7).map((recentBlog) => (
                <li key={recentBlog.id} className="hover:underline">
                  <Link to={`/blog/${recentBlog.id}`} className="text-lg">
                    {recentBlog.title}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No blogs available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
