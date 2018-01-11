import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import areIntlLocalesSupported from 'intl-locales-supported';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { CreateResource } from '../actions/action'

/* eslint-disable */
let DateTimeFormat = null;
if (areIntlLocalesSupported('fr')) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}
/* eslint-enable */

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing.desktopGutter}px;
  display: flex;
  flex-flow: column;
`

const ValidationMessage = styled.div`
  color: ${props => (props.error ? props.theme.textField.errorColor : props.theme.palette.accent1Color)};
  margin: 12px 0;
`

const Button = styled(RaisedButton)`
  margin: 12px;
  float: right;
  flex: 1 1 auto;
`


class AddResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
      date: null,
      repetition: '',
      validationMessage: '',
      errorName: '',
      errorValue: '',
      errorDate: '',
      errorRepetition: ''
    };
  }

  onChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  }

  handleDate = (event, date) => {
    this.setState({
      date,
    });
  };

  handleRepetition = (event, index, value) => this.setState({ repetition: value });

  handleSave = () => {
    const {
      name, value, date, repetition
    } = this.state
    let errorValue = '';
    if (value) {
      errorValue = /^\d+$/.test(value) ? '' : 'Veuillez rentrer que des chiffres'
    } else {
      errorValue = 'Veuillez rentrer une valeur'
    }
    this.setState({
      errorName: name ? '' : 'Veuillez rentrer un nom',
      errorValue,
      errorDate: date ? '' : 'Veuillez rentrer une date',
      errorRepetition: repetition ? '' : 'Veuillez rentrer une fréquence',
    });
    if (name && /^\d+$/.test(value) && date && repetition) {
      CreateResource(
        {
          name, value, date, repetition
        },
        () => {
          this.setState({
            validationMessage: <ValidationMessage theme={this.props.muiTheme}>Ressource enregistré <span role="img" aria-label="smiling face with sunglasses">😎</span></ValidationMessage>,
            name: '',
            value: '',
            date: null,
            repetition: ''
          });
        }, (e) => {
          this.setState({
            validationMessage: <ValidationMessage theme={this.props.muiTheme} error>{e}</ValidationMessage>
          })
        }
      )
    }
  }

  field = (keyValue, KeyError, label) => (
    <TextField
      name={keyValue}
      hintText={label}
      floatingLabelText={label}
      value={this.state[keyValue]}
      errorText={this.state[KeyError]}
      onChange={e => this.onChange(keyValue, e)}
    />
  )

  render() {
    return (
      <Wrapper theme={this.props.muiTheme}>
        Ajouter une ressource
        {this.field('name', 'errorName', 'Nom')}
        {this.field('value', 'errorValue', 'Montant')}
        <DatePicker
          hintText="Date"
          mode="landscape"
          floatingLabelText="Date"
          value={this.state.date}
          onChange={this.handleDate}
          locale="fr"
          DateTimeFormat={DateTimeFormat}
          errorText={this.state.errorDate}
        />
        <SelectField
          floatingLabelText="Répétition"
          value={this.state.repetition}
          onChange={this.handleRepetition}
          errorText={this.state.errorRepetition}
        >
          <MenuItem value="Annual" primaryText="Annuel" />
          <MenuItem value="Biannual" primaryText="Semestriel" />
          <MenuItem value="Quarterly" primaryText="Trimestriel" />
          <MenuItem value="Monthly" primaryText="Mensuel" />
          <MenuItem value="Once" primaryText="Une seule fois" />
        </SelectField>
        {this.state.validationMessage}
        <Button label="Sauvegarder" primary onClick={e => this.handleSave(e)} />
      </Wrapper>
    );
  }
}

AddResource.propTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.shape({
      textColor: PropTypes.string
    })
  })
};

export default muiThemeable()(AddResource);
