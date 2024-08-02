import { Link } from "react-router-dom";
import Navbar from "./core/Navbar";
import recentBlog from "../../config/recentBlog";
import blogDetail from "../../config/blogDetail.ts";
import BlogCards from './core/Card/BlogCards.tsx';

interface BlogPost {
    title: string;
    link: string;
}

const Blog = () => {
    return (
        <div className="bg-tut-bg">
            <Navbar />
            <div className="py-20 w-full flex justify-center">
                <div className="mx-5 lg:mx-auto mt-5 lg:w-8/12">
                    <div className="grid md:grid-cols-2 gap-5 ">
                        {blogDetail.map((blog, index) => (
                            <BlogCards key={index} {...blog} />
                        ))}
                    </div>
                </div>

                <div className="bg-[#000000] mt-3 text-[#fefffe] h-96 rounded-3xl flex-col w-4/12 md:w-3/12 mr-2 hidden lg:flex p-2">
                    <h3 className="text-center text-3xl">Recent Post</h3>
                    <ul className="flex flex-col m-3 gap-2 mt-5 text-lg">
                        {recentBlog.map((blog: BlogPost, index) => (
                            <li key={index}>
                                <Link to={blog.link}>{blog.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Blog;
