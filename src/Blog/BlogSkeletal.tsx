
import { Link } from "react-router-dom";
import Navbar from "../component/core/Navbar.tsx";
import recentBlog from "../../config/recentBlog.ts"; // Import correctly

interface BlogPost {
  title: string;
  link: string;
}

const BlogSkeletal = () => {
  return (
    <div className="">
      <Navbar />

      <div className="my-20 w-full flex flex-row justify-evenly">
        {/* Blog Posts */}
        <div className="gap-3 grid w-full lg:flex-row lg:w-2/3">
          {/* Cover Image */}
          <img
            src="../src/assets/nodejs.jpg"
            className="mx-auto rounded-lg w-11/12"
            alt=""
          />

          <div className="px-5 mt-2 md:px-7">
            <h2 className="text-2xl md:text-4xl font-bold space-y-4">
              {/* title */}
            </h2>
            <div className="mt-5 text-base md:text-lg">
              <h3 className="font-semibold text-xl md:text-3xl my-6 md:my-12">
                {/*Sub title */}
              </h3>
              <p className="text-base md:text-xl">
                {/* desc */}
              </p>

              <h3 className="font-semibold text-xl md:text-3xl my-6 md:my-12">
                {/*Sub title */}
              </h3>
              {/* <ul className="list-disc pl-5 text-base md:text-xl">
                <li>
                  point
                </li>
                <li>
                 point
                </li>
                <li>
                  point
                </li>
                <li>
                  point
                </li>
              </ul> */}
            </div>
          </div>
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

export default BlogSkeletal;
