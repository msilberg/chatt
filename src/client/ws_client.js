let socket;

export default function getSocket (cb) {
  if (!socket) {
    socket = new WebSocket('ws://localhost:8080/websocket');
    
    socket.addEventListener('open', () => {
      console.log('WS Client: established connection.');
    });
    socket.addEventListener('close', () => {
      console.log('WS Client: closed connection.');
    });
    socket.addEventListener('error', (error) => {
      console.error('WS Client: error', error);
    });
    socket.addEventListener('message', (event) => {
      console.log('WS Client: received new message', event.data);
      if (typeof cb === 'function') {
        let data = {};
        try {
          if (event.data) {
            data = JSON.parse(event.data)
          }
        } catch (error) {
          console.log('WS Client: cannot parse server message', error);
        }
        cb(data);
      }
    });
  }

  return socket;
}


