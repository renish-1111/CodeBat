import { Link } from "react-router-dom";
import Navbar from "./core/Navbar";
import BlogCards from './core/Card/BlogCards.tsx';
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCardsSkeleton from "./core/Skeleton/BlogCardsSkeleton.tsx";

interface BlogPost {
    title: string;
    description: string;
    cover_image: string;
    id: number;
}

const Blog = () => {

    const [blog, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blogs`);
            setBlogs(response.data.blogs);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <div className="bg-tut-bg">
            <Navbar />
            <div className="py-20 w-full flex justify-center">
                <div className="mx-5 lg:mx-auto mt-5 lg:w-8/12">
                    <div className="grid md:grid-cols-2 gap-5 ">
                        {loading && <BlogCardsSkeleton />}
                        {blog && blog.map((blog: BlogPost, index) => (
                            <BlogCards
                                key={index}
                                title={blog.title}
                                description={blog.description}
                                cover_image={blog.cover_image}
                                id={blog.id}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-[#000000] mt-3 text-[#fefffe] h-96 rounded-3xl flex-col w-4/12 md:w-3/12 mr-2 hidden lg:flex p-2">
                    <h3 className="text-center text-3xl">Recent Post</h3>
                    <ul className="flex flex-col m-3 gap-2 mt-5 text-lg">
                        {blog.length > 0 ? (
                            blog.slice(0, 7).map((blog: BlogPost, index) => (
                                <li key={index}>
                                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                                </li>
                            ))
                        ) : (
                            <p>No blogs available.</p>
                        )}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Blog;
