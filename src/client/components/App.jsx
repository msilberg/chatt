import React, { Component } from 'react';

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
      messages: [],
    };
    this.socket = props.socket;
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch(`${apiPrefix}/getChattInfo`)
      .then(response => {
        if (response?.status === 200) {
          return response.json();
        }
      })
      .then(({ user, messages } = {}) => {
        this.setState({ loading: false });
        if (user) {
          this.setState({ user, messages });
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
          this.getUser();
        } else {
          throw new Error('Cannot create login with this username')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { loading, user, messages } = this.state;

    return (
      <div>
        {
          loading ?
            <Loading /> :
            (
              (user && messages) ?
                <Chatt user={user} existingMessages={messages} socket={this.socket} /> :
                <Login onLoginSubmit={this.onLoginSubmit} />
            )
        }
      </div>
    );
  }
}

export default App;
