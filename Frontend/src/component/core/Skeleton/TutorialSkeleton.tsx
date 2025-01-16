import React from 'react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';

const TutorialSkeleton: React.FC = () => {
  const isMobile = window.innerWidth < 600;
  const containerPadding = isMobile ? 2 : 0;

  return (
    <Box sx={{paddingX: containerPadding,paddingTop:10, maxWidth: '1200px', margin: 'auto' }}>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={30}
          width={isMobile ? '40%' : '8%'}
          sx={{
            borderRadius: '8px',
            bgcolor: '#e8e8e8',
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={30}
          width={isMobile ? '40%' : '7%'}
          sx={{
            borderRadius: '8px',
            bgcolor: '#e8e8e8',
          }}
        />
      </Box>
      {/* Page Header */}
      <Skeleton
        variant="text"
        animation="wave"
        height={70}
        width={isMobile ? '80%' : '30%'}
        sx={{ margin: '20px auto', bgcolor: '#d6d6d6' }}
      />

      {/* Subtitle */}
      <Skeleton
        variant="text"
        animation="wave"
        height={50}
        width={isMobile ? '80%' : '50%'}
        sx={{ marginY: 4, bgcolor: '#e0e0e0' }}
      />
      <Box>
      <Skeleton
        variant="text"
        animation="wave"
        height={40}
        width={isMobile ? '100%' : '100%'}
        sx={{ marginBottom: -1, bgcolor: '#e0e0e0' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        height={40}
        width={isMobile ? '100%' : '100%'}
        sx={{ marginBottom: -1, bgcolor: '#e0e0e0' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        height={40}
        width={isMobile ? '100%' : '100%'}
        sx={{ marginBottom: -1, bgcolor: '#e0e0e0' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        height={40}
        width={isMobile ? '100%' : '100%'}
        sx={{ marginBottom: -1, bgcolor: '#e0e0e0' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        height={40}
        width={isMobile ? '100%' : '100%'}
        sx={{marginBottom: -1,  bgcolor: '#e0e0e0' }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        height={40}
        width={isMobile ? '100%' : '100%'}
        sx={{ marginBottom: 5, bgcolor: '#e0e0e0' }}
      />
      </Box>
      

      {/* Content Area */}
      <Stack spacing={4}>
        {/* Image Placeholder */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={isMobile ? 150 : 300}
          sx={{
            width: '100%',
            borderRadius: '8px',
            bgcolor: '#f0f0f0',
          }}
        />

        {/* Paragraph Skeletons */}
        <Box>
          <Skeleton
            variant="text"
            animation="wave"
            height={30}
            width="100%"
            sx={{ marginBottom: 1, bgcolor: '#e6e6e6' }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            height={30}
            width="100%"
            sx={{ marginBottom: 1, bgcolor: '#e6e6e6' }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            height={30}
            width="90%"
            sx={{ marginBottom: 1, bgcolor: '#e6e6e6' }}
          />
        </Box>

        {/* List Section */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              textAlign: 'left',
              color: 'grey.600',
            }}
          >
          </Typography>
          <Stack spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                animation="wave"
                height={40}
                sx={{
                  width: '100%',
                  borderRadius: '6px',
                  bgcolor: '#f5f5f5',
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* Footer Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={50}
          width={isMobile ? '40%' : '25%'}
          sx={{
            borderRadius: '8px',
            bgcolor: '#e8e8e8',
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={50}
          width={isMobile ? '40%' : '25%'}
          sx={{
            borderRadius: '8px',
            bgcolor: '#e8e8e8',
          }}
        />
      </Box>
    </Box>
  );
};

export default TutorialSkeleton;
