import { Link } from "react-router-dom";
import Navbar from "./core/Navbar";


const Blog = () => {
    const blogPosts = [
        {
            title: "Building a React App with Tailwind CSS",
            description: "Learn how to create a stunning React application using Tailwind CSS for styling.",
            imageUrl: "./src/assets/image.png",
            link: "/blog/react-tailwind",
            count: 0,
        },
        {
            title: "Mastering JavaScript Arrays: A Comprehensive Guide",
            description: "Explore the power of JavaScript arrays with this in-depth guide.",
            imageUrl: "./src/assets/23.png",
            link: "/blog/javascript-arrays",
            count: 0,
        },
        {
            title: "Building a React App with Tailwind CSS",
            description: "Learn how to create a stunning React application using Tailwind CSS for styling.",
            imageUrl: "./src/assets/image.png",
            link: "/blog/react-tailwind",
            count: 0,

        },
        {
            title: "Mastering JavaScript Arrays: A Comprehensive Guide",
            description: "Explore the power of JavaScript arrays with this in-depth guide.",
            imageUrl: "./src/assets/23.png",
            link: "/blog/javascript-arrays",
            count: 0,
        },

    ];

    return (
        <div>
            <Navbar />

            <div className="my-20 w-full flex flex-row justify-evenly">
                {/* Blog Posts */}
                <div className="  gap-5 grid md:grid-cols-2 w-full mx-3 md:flex-row md:w-2/3">
                    {/* 66% width */}
                    {blogPosts.map((post) => (
                        <div
                            key={post.title}
                            className="card p-2 rounded-lg shadow-2xl bg-white border border-gray-300"
                        >
                            <Link to={post.link} className="block">
                                <div className="relative h-50 rounded-lg overflow-hidden">
                                    <img
                                        className=""
                                        src={post.imageUrl}
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
                <div className="bg-[#1876d3] text-[#fefffe] h-96 rounded-3xl flex-col w-3/12 mr-1 hidden md:flex p-2">
                    {/* 33% width */}
                    <div className="text-center text-3xl">Recent Post</div>

                    <div className="flex flex-col  m-3 gap-2 mt-5 text-xl">
                        <li>
                            <Link to={"/blog/react-tailwind"}>
                                React Tailwind
                            </Link>
                        </li>
                        <li>
                            <Link to={"/blog/javascript-arrays"}>
                                Javascript Arrays
                            </Link>
                        </li>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Blog;
