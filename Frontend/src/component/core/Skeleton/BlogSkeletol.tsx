import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import recentBlog from '../../../../config/recentBlog';
import { Link } from 'react-router-dom';

interface BlogPost {
  title: string;
  link: string;
}

const BlogSkeleton: React.FC = () => {
  const isMobile = window.innerWidth < 600;
  const skeletonWidth = isMobile ? '100%' : '95%';
  const skeletonHeight = isMobile ? 200 : 430;

  return (
    <div className="my-20 w-full flex flex-col lg:flex-row justify-evenly">
      <div className="px-2 grid w-full lg:w-2/3">
      <div className=' flex justify-center px-3 h-[150] md:h-full'>
        <Skeleton sx={{bgcolor:'#ababab' }} variant="rectangular" animation="wave" height={skeletonHeight} width={skeletonWidth} style={{ borderRadius: '5px' }} />
      </div>

        <div className="mt-5">
          <h2 className="md:px-8 px-3">
            <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={70} width={isMobile ? '100%' : 600} />
          </h2>
          <div className="md:px-5 px-2 mt-3 text-base md:text-lg">
            <h3 className="font-semibold text-xl md:text-3xl my-6 md:my-12">
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={50} width={isMobile ? '100%' : 600} />
            </h3>
            <p className="text-base md:text-xl">
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
            </p>

            <h3 className=" font-semibold text-xl md:text-3xl my-3 md:my-10">
              <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={50} width={isMobile ? '100%' : 600} />
            </h3>
            <ul className="px-6 list-disc  text-base md:text-xl">
              <li>
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              </li>
              <li>
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              </li>
              <li>
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              </li>
              <li>
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
                <Skeleton sx={{bgcolor:'#ababab' }} variant="text" animation="wave" height={30} width="100%" />
              </li>
            </ul>
          </div>
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
  );
};

export default BlogSkeleton;
