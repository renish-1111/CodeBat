import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/core/Navbar.tsx';
import recentBlog from '../../config/recentBlog.ts';
import { Skeleton } from '@mui/material';

interface BlogPost {
  title: string;
  link: string;
}

const NodeJs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="">
      <Navbar />

      <div className="my-20 w-full flex flex-row justify-evenly">
        <div className="gap-3 grid w-full lg:flex-row lg:w-2/3">
          {loading ? (
            <Skeleton variant="rectangular" width="90%" height={300} className="mx-auto rounded-lg mb-5" />
          ) : (
            <img
              src="/assets/nodejs.jpg"
              className="mx-auto rounded-lg w-11/12 mb-5"
              alt=""
            />
          )}

          <div className="px-5 mt-2 md:px-7">
            {loading ? (
              <>
              
              
              <div className="grid gap-3 grid-cols-1">
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={30}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="60%" height={30}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
                <Skeleton variant="text" width="90%" height={20}  />
              </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-4xl font-bold space-y-4">
                  Getting Started with Node.js
                </h2>
                <div className="mt-5 text-base md:text-lg">
                  <h3 className="font-semibold text-xl md:text-3xl my-6 md:my-12">
                    Introduction
                  </h3>
                  <p className="text-base md:text-xl">
                    Node.js is a powerful JavaScript runtime built on Chrome's V8
                    JavaScript engine. It allows developers to use JavaScript to
                    write server-side code, enabling the creation of fast and
                    scalable network applications. With its event-driven,
                    non-blocking I/O model, Node.js is ideal for building real-time
                    applications, such as chat applications, collaborative tools,
                    and online games.
                  </p>

                  <h3 className="font-semibold text-xl md:text-3xl my-6 md:my-12">
                    Why Use Node.js?
                  </h3>
                  <ul className="list-disc pl-5 text-base md:text-xl">
                    <li>
                      JavaScript Everywhere: With Node.js, you can use JavaScript on
                      both the client and server sides.
                    </li>
                    <li>
                      High Performance: Node.js is designed to handle a large number
                      of simultaneous connections with high throughput.
                    </li>
                    <li>
                      Large Ecosystem: The npm (Node Package Manager) ecosystem offers
                      thousands of libraries and tools that simplify development.
                    </li>
                    <li>
                      Scalability: Node.js is well-suited for building scalable
                      applications due to its non-blocking, asynchronous architecture.
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#1876d3] mt-3 text-[#fefffe] h-96 rounded-3xl flex-col w-4/12 md:w-3/12 mr-2 hidden lg:flex p-2">
          <h3 className="text-center text-3xl">Recent Post</h3>

          <ul className="flex flex-col m-3 gap-2 mt-5 text-lg">
            {loading ? (
              <>
                <Skeleton variant="text" width="100%" className="mb-2" />
                <Skeleton variant="text" width="100%" className="mb-2" />
                <Skeleton variant="text" width="100%" className="mb-2" />
              </>
            ) : (
              recentBlog.map((blog: BlogPost, index) => (
                <li key={index}>
                  <Link to={blog.link}>{blog.title}</Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NodeJs;
