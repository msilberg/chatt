import React, { Component } from 'react';
import { instanceOf } from 'prop-types';

import Login from './Login';
import Chatt from './Chatt';
import Loading from './Loading';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: null,
    };
  }

  componentDidMount() {
    fetch('/api/v1/getUserInfo')
      .then(res => {
        if (res?.status === 200) {
          return res.json();
        }
      })
      .then(user => {
        this.setState({ loading: false })
        if (user) {
          this.setState({ username: user.username });
        }
      });
  }

  onLoginSubmit(username) {
    console.log('look here => onLoginSubmit', username);
  }

  render() {
    const { loading, username } = this.state;
    return (
      <div>
        {
          loading ?
            <Loading /> :
            (
              username ?
                <Chatt username={username} /> :
                <Login onLoginSubmit={this.onLoginSubmit} />
            ) 
        }
      </div>
    );
  }
}

export default App;
