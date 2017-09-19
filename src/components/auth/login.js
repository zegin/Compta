import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../actions';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TextField
} from 'redux-form-material-ui'

const form = reduxForm({
  form: 'login'
});
var error = {user: '', password: ''}
class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    error.user = "";
    error.password = "";
    if(this.props.errorMessage) {
      switch (this.props.errorMessage.type) {
        case "user":
          error.user = this.props.errorMessage.message
          break;
        case "password":
          error.password = this.props.errorMessage.message
          break;
        default:
          return (
            <div>Une erreur inconnu c&lsquo;est produite</div>
          )
      }
    }
  }

  render() {

    const { handleSubmit } = this.props;
    const style = {
        margin: 12,
      };
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
          <div>
            <Field name="user" component={TextField} hintText="Utilisateur" floatingLabelText="Utilisateur" errorText= {error.user}/>
          </div>
          <div>
            <Field name="password" component={TextField} hintText="Mot de passe" floatingLabelText="Mot de passe" errorText= {error.password}/>
          </div>
          <div>
            <RaisedButton label="Connection" primary={true} style={style} type="submit"/>
          </div>
        </form>
        <register/>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}
Login = connect(mapStateToProps, { loginUser })(form(Login));
export default Login
