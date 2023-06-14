import * as React from 'react';

const Chatt = (props) => {
  const { username } = props;

  return (
    <h1>{`Hello ${username}`}</h1>
  );
}

export default Chatt;