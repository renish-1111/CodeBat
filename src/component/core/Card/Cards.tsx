import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  image: string;
  link:string;
}

// Use the CardProps interface as the type for the props parameter
export default function Cards(props: CardProps) {
  return (
    <Link to={props.link}>
      <Card sx={{ maxHeight: 440 , minWidth:280 , bgcolor:"#121212"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ objectFit: 'cover' }}
            image={props.image}
            alt="error"
            sx={{ padding:"12px" , bgcolor:"#121212"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" >
              <div className='flex justify-center text-white'>
              {props.title}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
