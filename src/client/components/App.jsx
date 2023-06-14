import React, { Component, useState } from 'react';

import Login from './Login';
import Chatt from './Chatt';
import Loading from './Loading';

const apiPrefix = '/api/v1';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch(`${apiPrefix}/getUserInfo`)
      .then(response => {
        if (response?.status === 200) {
          return response.json();
        }
      })
      .then(user => {
        this.setState({ loading: false });
        if (user) {
          this.setState({ user });
        }
      });
  }

  onLoginSubmit = username => {
    const user = { username };
    fetch(`${apiPrefix}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (response?.status === 201) {
          this.setState({ user });
        } else {
          throw new Error('Cannot create login with this username')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div>
        {
          loading ?
            <Loading /> :
            (
              user ?
                <Chatt user={user} /> :
                <Login onLoginSubmit={this.onLoginSubmit} />
            )
        }
      </div>
    );
  }
}

export default App;
