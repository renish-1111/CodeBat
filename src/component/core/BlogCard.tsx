import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { Skeleton } from '@mui/material';
import React from 'react';

interface BlogDetail {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    loading: boolean;
}

const BlogCard: React.FC<BlogDetail> = React.memo(({ title, description, imageUrl, link, loading }) => (
    <div className="card p-2 rounded-lg shadow-2xl bg-white border border-gray-300">
        <Link to={link} className="block">
            <div className="relative h-50 rounded-lg overflow-hidden">
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={220} className="rounded-lg h-full w-full" animation="wave" />
                ) : (
                    <LazyLoad height={220} offset={100} once>
                        <img
                            className="rounded-lg h-full w-full object-cover"
                            src={imageUrl}
                            alt={title}
                        />
                    </LazyLoad>
                )}
            </div>
            <div className="p-4">
                {loading ? (
                    <>
                        <Skeleton variant="text" width="100%" height={50} className="mb-4" animation="wave" />
                        <Skeleton variant="text" width="100%" height={30} className="mb-4" animation="wave" />
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="mt-2">{description}</p>
                    </>
                )}
            </div>
        </Link>
    </div>
));

export default BlogCard;
