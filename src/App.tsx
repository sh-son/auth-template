import React from 'react';
import logo from './logo.svg';
import './style/common.scss';
import './App.css';

import { SamplePanel } from './components/SamplePanel';
import { Login } from './pages/Login';

interface AppProps {
}

interface AppState {
  token: string
  username: string
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      token: "",
      username: ""
    };
  }

  componentDidMount() {
    fetch('auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin"
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.username && data.token) {
        localStorage.setItem('utopsoft.token', data.token);
        this.setState({
          username: data.username,
          token: data.token
        });
      }
    });
  }

  render() {
    const { username, token } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Login />
          <p>
            <code>src/App.tsx</code>
          </p>
          <p>
            { username ? `${username}` : 'Hello'} <br></br>
            { token ? `${token}` : 'World'}
          </p>
          <SamplePanel />
        </header>
      </div>
    );
  }
}

export default App;