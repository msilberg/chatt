import React from 'react';
import ReactDOM from 'react-dom';
const socket = new WebSocket('ws://localhost:8080/websocket');

socket.addEventListener('open', () => {
  console.log('WebSocket connection established.');
});
socket.addEventListener('close', () => {
  console.log('WebSocket connection closed.');
});
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// socket.addEventListener('message', (event) => {
//   console.log('Received message:', event.data);
// });

import App from './components/App';

ReactDOM.render(<App socket={socket} />, document.getElementById('root'));
