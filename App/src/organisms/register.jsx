import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { CreateUser } from '../actions/action'
import { I18n } from 'react-i18next';

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
    CreateUser(firstName, lastName, user, password, this.props.handleConnection)
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
      <I18n>
        {
          (t, { i18n }) => (
            <form>
              <div>
                {Field('firstName', 'errorFirstName', t('user.firstName'))}
              </div>
              <div>
                {Field('lastName', 'errorLastName', t('user.lastName'))}
              </div>
              <div>
                {Field('user', 'errorUser', t('user.userName'))}
              </div>
              <div>
                {Field('password', 'errorPassword', t('user.password'))}
              </div>
              <RaisedButton label={t('actions.register')} primary style={style} onClick={e => this.handleSubmit(e)} />
            </form>
          )
        }
      </I18n>
    );
  }
}

Register.propTypes = {
  handleConnection: PropTypes.func.isRequired
};


export default Register
