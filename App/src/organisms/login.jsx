import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { LoginUser } from '../actions/action'
import { I18n } from 'react-i18next';

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
    LoginUser(user, password, this.props.handleConnection)
  }

  render() {
    const style = {
      margin: 12,
    };
    return (
      <I18n>
        {
          (t, { i18n }) => (
            <form>
              <div>
                <TextField
                  name="user"
                  hintText={t('user.userName')}
                  floatingLabelText={t('user.userName')}
                  value={this.state.user}
                  errorText={this.state.errorUser}
                  onChange={e => this.onChange('user', e)}
                />
              </div>
              <div>
                <TextField
                  name="password"
                  hintText={t('user.password')}
                  floatingLabelText={t('user.password')}
                  value={this.state.password}
                  errorText={this.state.errorPassword}
                  onChange={e => this.onChange('password', e)}
                />
              </div>
              <div>
                <RaisedButton label={t('actions.connection')} primary style={style} onClick={e => this.handleSubmit(e)} />
              </div>
            </form>
          )
        }
      </I18n>
    );
  }
}

Login.propTypes = {
  handleConnection: PropTypes.func.isRequired
};

export default Login
