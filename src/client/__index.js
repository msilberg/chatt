/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

function Hello() {
  return <h1>Hello, World!</h1>;
}

ReactDOM.hydrate(<Hello />, document.getElementById('root'));
