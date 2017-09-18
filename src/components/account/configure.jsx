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
      }
    }

    const textfield =  ({ input, hintText, label, disabled, fieldError}) => (
      <TextField
        hintText={hintText}
        floatingLabelText={label}
        {...input}
        errorText= {fieldError}
        disabled= {disabled}
      />
    )
    return (
      <div>
        <h2>Bienvenue {this.state.user.firstName}</h2>
        <p>Pour votre première connection, nous allons configurer votre compte</p>
        <form style={style.container}>
          <div style={style.col1}>
            <SelectField
              floatingLabelText="Dans quel foyez êtes vous ? "
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            >
              <MenuItem value={1} primaryText="Gigi-Caro" />
              <MenuItem value={-1} primaryText="Aucun" />
            </SelectField>
          </div>
          <div style={style.stateHide}>
            <Field name="heart" component={textfield} type="text" hintText="Votre foyez" label="Entrez votre foyez" error={error.heart} disabled={this.state.disabledHeart} />
          </div>
          <div style={style.full}>
            <Field name="wage" component={textfield} type="text" hintText="Entrez votre salaire net" label="Salaire" error={error.wage}/>
          </div>
          <div>
            <Field name="budget" component={textfield} type="text" hintText="Entrez votre budget" label="Budget" error={error.budget}/>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}
Configure = connect(mapStateToProps, { loginUser })(form(Configure));
export default Configure
