import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const apiPrefix = '/api/v1';

const Chatt = (props) => {
  const { user, existingMessages, socket } = props;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(existingMessages);

  socket(
    ({ eventName, data } = {}) => {
      if (eventName === 'newMessage' && data?.username && data?.message && data.username !== user.username) {
        console.log('received a new message from another user', data);
        setMessages([...messages, { username: data.username, message: data.message }]);
      }
    }
  );

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
    setMessages([...messages, { username: user.username, message }]);
    fetch(`${apiPrefix}/uploadMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
      .then(response => {
        if (response?.status === 201) {
          setMessage('');
        } else {
          throw new Error('Cannot upload new message')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
          {messages.map(({ username, message }, index) => {
            const isOwn = username === user.username;
            return (
              <Item key={index} style={{ textAlign: isOwn ? 'right' : 'left' }}><span className={isOwn ? 'highlight-text-own' : 'highlight-text-another'}>{username}</span>: {message}</Item>
            );
          })}
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
  existingMessages: PropTypes.array, 
  socket: PropTypes.func,
};

Chatt.defaultProps = {
  user: {},
  existingMessages: [],
  socket: () => {},
}

export default Chatt;