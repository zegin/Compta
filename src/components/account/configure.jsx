import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { Link } from 'react-router';
import { loginUser } from '../../actions';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


const form = reduxForm({
  form: 'login'
});

var error = {wage: '', heart: '', budget: ''}
var stateHide = {opacity: 0, display: 'none'}


class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {user: jwtDecode(cookie.load('token', true))._doc, value: null}
  }

  handleChange(event, index, val){
    console.log(val)
    this.setState({value: val}, function(){
      if(this.state.value === -1){
        stateHide.display = 'block'
        stateHide.opacity = 1
        this.forceUpdate()
      }
      else{
        stateHide.display = 'none'
        stateHide.opacity = 0
        this.forceUpdate()
      }
    })
  }

  handleFormSubmit(formProps) {
    console.log(formProps)
    this.props.loginUser(formProps);
  }

  render() {

    var style = {
      container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '[first] 30rem 30rem [end]',
        gridColumnGap: '3rem'
      },
      full: {
        gridColumn: 'first / end'
      },
      stateHide: {
        display: stateHide.display,
        opacity: stateHide.opacity,
        transition: 'opacity .7s'
      },
      button: {
        margin: '12px'
      }
    }

    const textField =  ({ input, hintText, label, disabled, fieldError}) => (
      <TextField
        hintText={hintText}
        floatingLabelText={label}
        {...input}
        errorText= {fieldError}
        disabled= {disabled}
      />
    )

    const selectField = props => (
    <SelectField
      floatingLabelText={props.label}
      errorText={props.touched && props.error}
      {...props}
      onChange={props.onChange}>
    </SelectField>

    )

    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Bienvenue {this.state.user.firstName}</h2>
        <p>Pour votre première connection, nous allons configurer votre compte</p>
        <form style={style.container} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div style={style.col1}>
            <Field name="Heart" component={selectField} label="Dans quel foyez êtes vous ?"
              onChange={(event, index, value) => this.handleChange(event, index, value)}>
              <MenuItem value={1} primaryText="Gigi-Caro"/>
              <MenuItem value={-1} primaryText="Aucun"/>
            </Field>
          </div>
          <div style={style.stateHide}>
            <Field name="heart" component={textField} type="text" hintText="Votre foyez" label="Entrez votre foyez" error={error.heart} disabled={this.state.disabledHeart} />
          </div>
          <div style={style.full}>
            <Field name="wage" component={textField} type="text" hintText="Entrez votre salaire net" label="Salaire" error={error.wage}/>
          </div>
          <div style={style.full}>
            <Field name="budget" component={textField} type="text" hintText="Entrez votre budget" label="Budget" error={error.budget}/>
          </div>
          <div style={Object.assign({}, style.full, style.button)}>
            <RaisedButton label="Sauvegarder" primary={true} style={style} type="submit"/>
          </div>
        </form>
      </div>
    );
  }
}

Configure.propTypes = {
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
Configure = connect(mapStateToProps, { loginUser })(form(Configure));
export default Configure
