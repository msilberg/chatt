import * as React from 'react';

const Chatt = (props) => {
  const { user } = props;

  return (
    <h1>{`Hello ${user.username}`}</h1>
  );
}

export default Chatt;