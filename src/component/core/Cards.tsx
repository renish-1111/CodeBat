import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';


interface CardsProps {
  title: string;
  img: string;
  desc?: string;
  link: string;
}

const Cards: React.FC<CardsProps> = ({ title, img, desc, link }) => {
  return (
    <Link to={link}>
      <Card sx={{ minWidth: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            width="140"
            image={img}
            alt="error"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Cards;
