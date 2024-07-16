import { Link } from "react-router-dom";
import Navbar from "./core/Navbar";
import recentBlog from "../../config/recentBlog";
import blogDetail from "../../config/blogDetail";

interface BlogPost {
    title: string;
    link: string;
}

interface BlogDetail {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}


const Blog = () => {

    return (
        <div>
            <Navbar />

            <div className="my-20 w-full flex flex-row justify-evenly">
                {/* Blog Posts */}
                <div className="  gap-5 grid md:grid-cols-2 w-full mx-3 md:flex-row md:w-2/3">
                    {/* 66% width */}
                    {blogDetail.map((post : BlogDetail,index : number) => (
                        <div
                            key={index}
                            className="card p-2 rounded-lg shadow-2xl bg-white border border-gray-300"
                        >
                            <Link to={post.link} className="block">
                                <div className="relative h-50 rounded-lg overflow-hidden">
                                    <img
                                        className=""
                                        src={post.imageUrl} // Access imageUrl from the object
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold">{post.title}</h2>
                                    <p className="mt-2">{post.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Sidebar at right side */}
                <div className="bg-[#1876d3] mt-3 text-[#fefffe] h-96 rounded-3xl flex-col w-4/12 md:w-3/12 mr-2 hidden lg:flex p-2">
                    {/* 33% width */}
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
