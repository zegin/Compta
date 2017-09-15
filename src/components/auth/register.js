import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const form = reduxForm({
  form: 'register',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.name) {
    errors.name = 'Please enter an name';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

var errorUser,errorLastName,errorFirstName,errorPassword = ""

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const textfield =  ({ input, label, error}) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        {...input}
        errorText= {error}
      />
    )
    const style = {
        margin: 12,
      };

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div>
          <Field name="lastName" component={textfield} type="text" label="Nom" error={errorLastName}/>
        </div>
        <div>
          <Field name="firstName" component={textfield} type="text" label="Prenom" error={errorFirstName}/>
        </div>
        <div>
          <Field name="name" component={textfield} type="text" label="Nom d'Utilisateur" error={errorUser}/>
        </div>
        <div>
          <Field name="password" component={textfield} type="password"  label="Mot de passe" error={errorPassword}/>
        </div>
        <RaisedButton label="S'enregistrer" primary={true} style={style} type="submit"/>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}
Register = connect(mapStateToProps, { registerUser })(form(Register));
export default Register
