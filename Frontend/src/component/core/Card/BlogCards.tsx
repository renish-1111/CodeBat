import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import BlogCardsSkeleton from '../Skeleton/BlogCardsSkeleton.tsx'; // Assuming BlogCardsSkeleton is in the same directory

interface BlogCardsProps {
  title: string;
  description: string;
  cover_image: string;
  id: number;
}

const BlogCards: React.FC<BlogCardsProps> = ({ title, description, cover_image ,id }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BlogCardsSkeleton />;
  }
  
  return (
    <Link  to={`/blog/${id}`}>
      <Card sx={{ maxWidth: 450 , bgcolor:'#121212',color:'white'}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={250}
            width={450}
            image={cover_image}
            alt="error"
            className='rounded-lg p-2'
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color:'white',
              textOverflow: 'ellipsis',
            }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default BlogCards;
