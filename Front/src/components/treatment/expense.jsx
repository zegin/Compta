import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

import IntlPolyfill from 'intl'
import 'intl/locale-data/jsonp/fr'

import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import { TextField, DatePicker } from 'redux-form-material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable';

import { saveExpense } from '../../actions';

const form = reduxForm({
  form: 'expense'
});

const style = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '[start] 256px [end]',
    gridRowGap: '1rem',
    paddingLeft: '.5rem'
  },
  field: {
  },
  sliderLabel: {
    marginBottom: 0
  },
  slider: {
    marginBottom: 0
  },
  button: {
    margin: '1rem 4rem'
  }
};

const error = { product: '', price: '' }
class Expense extends Component {
  state = { sliderValue: 0, sliderLabel: 'Jamais', user: jwtDecode(cookie.load('token', true)), who: jwtDecode(cookie.load('token', true)).firstName, open: false }

  componentDidMount() {
  console.log(this.props.muiTheme);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.passed && !this.state.open){
      this.handleTouchTap()
    }
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleFormSubmit(formProps) {
    let newFormProps = null;
    newFormProps = formProps;
    if (!newFormProps.date) {
      newFormProps.date = new Date()
    }
    newFormProps.repetition = this.state.sliderValue
    newFormProps.who = this.state.who
    this.props.saveExpense(newFormProps)
  }

  handleSlider(event, value) {
    this.setState({
      sliderValue: value
    }, function () {
      switch (this.state.sliderValue) {
        case 1:
          this.setState({
            sliderLabel: 'Tous les Ans'
          });
          break;
        case 2:
          this.setState({
            sliderLabel: 'Tous les Semestres'
          });
          break;
        case 3:
          this.setState({
            sliderLabel: 'Tous les Trimestres'
          });
          break;
        case 4:
          this.setState({
            sliderLabel: 'Tous les Mois'
          });
          break;
        case 5:
          this.setState({
            sliderLabel: 'Toutes les Semaines'
          });
          break;
        default:
          this.setState({
            sliderLabel: 'Jamais'
          });
          break;
      }
    });
  }

  handleWho(event, value) {
    this.setState({
      who: value
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>Ajouter un débit</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} style={style.wrapper}>
          <div>
            <Field name="product" component={TextField} type="text" floatingLabelText="Produit" error={error.product} style={style.field} />
          </div>
          <div>
            <Field name="price" component={TextField} type="text" floatingLabelText="Prix" error={error.price} style={style.field}/>
          </div>
          <div>
            <Field
              name="date"
              component={DatePicker}
              floatingLabelText={(new Date()).toLocaleDateString('fr')}
              error={error.price}
              DateTimeFormat={IntlPolyfill.DateTimeFormat}
              locale="fr"
              format={null}
              cancelLabel="Annuler"
              style={style.field}
            />
          </div>
          <div>
            <p style={style.sliderLabel} >Répéter : {this.state.sliderLabel}</p>
            <Slider
              value={this.state.sliderValue}
              max={5}
              step={1}
              onChange={this.handleSlider.bind(this)}
              sliderStyle={style.slider}
            />
          </div>
          <div>
            <SelectField floatingLabelText="Acheteur" value={this.state.who} onChange={this.handleWho.bind(this)}  style={style.field}>
              <MenuItem value={'Gilian'} primaryText="Gilian" />
              <MenuItem value={'Caroline'} primaryText="Caroline" />
            </SelectField>
          </div>
          <RaisedButton label="Ajouter" primary style={style.button} type="submit" />
        </form>
        <Snackbar
          open={this.state.open}
          message="Dépense enregistrer"
          autoHideDuration={4000}
          onActionTouchTap={this.handleActionTouchTap}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.treatment.error,
    passed: state.treatment.passed
  };
}

Expense = connect(mapStateToProps, { saveExpense })(form(Expense));

Expense.propTypes = {
  saveExpense: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default muiThemeable()(Expense)
