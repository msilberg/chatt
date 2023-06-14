import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Chatt = (props) => {
  const { user } = props;

  const [message, setMessage] = useState('');

  const Item = styled(Paper)(() => ({
    backgroundColor: '#fff',
    fontFamily: 'Arial',
    padding: 10,
    textAlign: 'left',
    color: '#2b2929',
    width: '600px',
  }));

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleMessageUpload = () => {
    console.log('message', message);
    setMessage('');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          display: 'flex',
          justifyContent: 'top',
          alignItems: 'center',
          flexDirection: 'column',
          width: 700,
          height: 800,
          margin: 'auto',
        },
      }}
      autoComplete="off"
      className='wrapper'
    >
      <Paper elevation={12} style={{ backgroundColor: '#ebebeb' }}>
        <h2>{`Welcome to the Chatt room ${user.username.toUpperCase()}!`}</h2>
        <Stack spacing={2} className='chatt-messages-frame'>
          
        </Stack>
        <Stack direction="row" spacing={0} style={{ marginTop: '30px' }}>
          <TextField
            fullWidth
            id='send-message-input'
            placeholder='Type your message here'
            inputProps={{ maxLength: 100 }}
            onChange={handleMessageChange}
            value={message}
            onKeyUp={event => {
              event.preventDefault();
              if (event.key === 'Enter') {
                handleMessageUpload();
              }
            }}
          />
          <Button
            variant='contained'
            onClick={handleMessageUpload}
          >
            Send
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

Chatt.propTypes = {
  user: PropTypes.object,  
};

Chatt.defaultProps = {
  user: {},
}

export default Chatt;