import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Register from '../organisms/register';
import Login from '../organisms/login';

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
          <Login handleConnection={this.props.handleConnection} />
        </div>
        <div style={style.register}>
          <Register handleConnection={this.props.handleConnection} />
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  handleConnection: PropTypes.func.isRequired
};

export default Auth;
