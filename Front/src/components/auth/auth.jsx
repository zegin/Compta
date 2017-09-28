import React, { Component } from 'react';

// import HomePage from './components/pages/home-page';
import Register from './register';
import Login from './login';

const style = {
  container: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '30rem 30rem',
    gridColumnGap: '3rem'
  },
  login: {
    borderRight: '1px solid rgb(224, 224, 224)'
  }
}

class Auth extends Component {


  render() {
    return (
      <div style={style.container}>
        <div style={style.login}>
          <Login />
        </div>
        <div style={style.register}>
          <Register />
        </div>
      </div>
    );
  }
}

export default Auth;
