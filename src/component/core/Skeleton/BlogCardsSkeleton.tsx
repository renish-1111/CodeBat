import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BlogCardsSkeleton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const skeletonWidth = isMobile ? 300 : isTablet ? 300 : 450;
  const skeletonHeight = isMobile ? 200 : isTablet ? 200 : 250;

  return (
    <Card sx={{ maxWidth: skeletonWidth + 50 , bgcolor:'#121212' }}>
      <div className="flex justify-center m-2">
        <CardActionArea>
          <div className="flex justify-center"> {/* Add this div with flexbox */}
            <Skeleton sx={{bgcolor:'#ababab' }} variant="rectangular"   width={skeletonWidth} height={skeletonHeight} animation="pulse" />
          </div>
          <CardContent>
            <Skeleton sx={{bgcolor:'#ababab' }} animation="pulse" height={40} width="100%" style={{ marginBottom: 6}} />
            <Skeleton sx={{bgcolor:'#ababab' }} animation="pulse" height={20} width="100%" />
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};

export default BlogCardsSkeleton;