import React from 'react';
import ReactDOM from 'react-dom';
import getSocket from './ws_client';

import App from './components/App';

ReactDOM.render(<App socket={getSocket} />, document.getElementById('root'));
