import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import '../styles.css';

const Login = (props) => {
  const { onLoginSubmit } = props;
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError('');
  };

  const handleLoginSubmit = () => {
    if (username.trim() === '') {
      setError('Please enter a username.');
      return;
    }

    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(username)) {
      setError('Username must only contain letters and/or numbers.');
      return;
    }

    onLoginSubmit(username);
    setUsername('');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: 500,
          height: 500,
          margin: 'auto',
        },
      }}
      autoComplete="off"
      className='wrapper'
    >
      <Paper elevation={12}>
        <h1>Welcome to Chatt</h1>
        <h3>Pick up your user name</h3>
        <div className='wrapper-new-line'>&nbsp;</div>
        <div className='wrapper-new-line'>
          <TextField
            required
            id='username'
            label='User name'
            variant='outlined'
            value={username}
            onChange={handleUsernameChange}
            error={Boolean(error)}
            helperText={error}
            onKeyUp={event => {
              event.preventDefault();
              if (event.key === 'Enter') {
                handleLoginSubmit();
              }
            }}
            fullWidth
          />
        </div>
        <div className='wrapper-new-line'>
          <Button
            variant='contained'
            onClick={handleLoginSubmit}
          >
            Login to Chatt
          </Button>
        </div>
      </Paper>
    </Box>
  );
}

Login.propTypes = {
  onLoginSubmit: PropTypes.func,
};

Login.defaultProps = {
  onLoginSubmit: () => {},
}

export default Login;