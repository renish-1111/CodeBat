import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import CardsSkeleton from '../Skeleton/CardsSkeleton';
import { useEffect, useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  cover_image: string;
}

// Use the CardProps interface as the type for the props parameter
export default function Cards(props: CardProps) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CardsSkeleton />;
  }

  return (
    <Link to={'/tutorial/' + props.title}>
      <Card sx={{ minHeight: 350 , minWidth:300 , bgcolor:"#121212"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ objectFit: 'cover' }}
            image={props.cover_image}
            alt="error"
            sx={{ minHeight: 300, padding:"12px" , bgcolor:"#121212"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" >
              <div className='flex justify-center text-white'>
              {props.description}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
