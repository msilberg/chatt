import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box className='wrapper' sx={{ display: 'flex', width: 300, margin: 'auto' }}>
      <div className='wrapper-new-line'>
        <CircularProgress />
      </div>
    </Box>
  );
}

export default Loading;