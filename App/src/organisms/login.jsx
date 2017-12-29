import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import axios from 'axios';
import querystring from 'querystring'
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      errorUser: '',
      errorPassword: ''
    };
  }

  onChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  }

  handleSubmit() {
    const { user, password } = this.state
    this.setState({
      errorUser: user ? '' : 'Veuillez rentrer un nom d\'utilisateur',
      errorPassword: password ? '' : 'Veuillez rentrer un mot de passe'
    });
    if (!user || !password) {
      return
    }
    this.loginUser(user, password)
  }

  loginUser = (user, password) => {
    axios.post('http://localhost:3000/api/authenticate', querystring.stringify({ user, password }))
      .then((response) => {
        if (response.data.success) {
          cookie.save('token', jwt.decode(response.data.token), { path: '/' });
          this.props.handleConnection()
        } else {
          this.setState({
            errorUser: response.data.type === 'user' ? response.data.message : '',
            errorPassword: response.data.type === 'password' ? response.data.message : ''
          });
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div>
        <form>
          <div>
            <TextField
              name="user"
              hintText="Utilisateur"
              floatingLabelText="Utilisateur"
              value={this.state.user}
              errorText={this.state.errorUser}
              onChange={e => this.onChange('user', e)}
            />
          </div>
          <div>
            <TextField
              name="password"
              hintText="Mot de passe"
              floatingLabelText="Mot de passe"
              value={this.state.password}
              errorText={this.state.errorPassword}
              onChange={e => this.onChange('password', e)}
            />
          </div>
          <div>
            <RaisedButton label="Connection" primary style={style} onClick={e => this.handleSubmit(e)} />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleConnection: PropTypes.func.isRequired
};

export default Login
