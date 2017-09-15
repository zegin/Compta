import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { Link } from 'react-router';
import { loginUser } from '../../actions';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const form = reduxForm({
  form: 'login'
});
var errorUser = "";
var errorPassword = "";
class Login extends Component {
  handleFormSubmit(formProps) {
    // console.log(this.props.loginUser.type)
    this.props.loginUser(formProps);
  }

  renderAlert() {
    errorUser = "";
    errorPassword = "";
    if(this.props.errorMessage) {
      switch (this.props.errorMessage.type) {
        case "user":
          errorUser = this.props.errorMessage.message
          break;
        case "password":
          errorPassword = this.props.errorMessage.message
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
    const userfield =  ({ input, label}) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        {...input}
        errorText= {errorUser}
      />
      )
    const passwordfield =  ({ input, label}) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        {...input}
        errorText= {errorPassword}
      />
      )
    const style = {
        margin: 12,
      };
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
          <div>
            <Field name="user" component={userfield} label="Utilisateur"/>
          </div>
          <div>
            <Field name="password" component={passwordfield} label="Mot de passe"/>
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
