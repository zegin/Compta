import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import querystring from 'querystring'
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      user: '',
      password: '',
      errorFirstName: '',
      errorLastName: '',
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
    const {
      firstName, lastName, user, password
    } = this.state
    this.setState({
      errorFirstName: firstName ? '' : 'Veuillez rentrer votre Prénom',
      errorLastName: lastName ? '' : 'Veuillez rentrer votre Nom',
      errorUser: user ? '' : 'Veuillez rentrer un nom d\'utilisateur',
      errorPassword: password ? '' : 'Veuillez rentrer un mot de passe'
    });
    if (!firstName || !lastName || !user || !password) {
      return
    }
    this.createUser(firstName, lastName, user, password)
  }

  createUser = (firstName, lastName, user, password) => {
    axios.post('http://localhost:3000/api/register', querystring.stringify({
      firstName, lastName, user, password
    }))
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

    const Field = (keyValue, KeyError, label) => (
      <TextField
        name={keyValue}
        hintText={label}
        floatingLabelText={label}
        value={this.state[keyValue]}
        errorText={this.state[KeyError]}
        onChange={e => this.onChange(keyValue, e)}
      />
    )

    return (
      <form>
        <div>
          {Field('firstName', 'errorFirstName', 'Prénom')}
        </div>
        <div>
          {Field('lastName', 'errorLastName', 'Nom')}
        </div>
        <div>
          {Field('user', 'errorUser', 'Nom d\'utilisateur')}
        </div>
        <div>
          {Field('password', 'errorPassword', 'Mot de passe')}
        </div>
        <RaisedButton label="S'enregistrer" primary style={style} onClick={e => this.handleSubmit(e)} />
      </form>
    );
  }
}

Register.propTypes = {
  handleConnection: PropTypes.func.isRequired
};


export default Register
