// BlogCardsSkeleton.tsx
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

  const skeletonWidth = isMobile ? 300 : (isTablet ? 300 : 410);
  const skeletonHeight = isMobile ? 200 : (isTablet ? 200 : 250);

  return (
    <Card sx={{ maxWidth: skeletonWidth + 50 }}>
      <div className="flex justify-center m-2">
        <CardActionArea>
          <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight} animation="pulse" />
          <CardContent>
            <Skeleton animation="wave" height={40} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" />
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};

export default BlogCardsSkeleton;