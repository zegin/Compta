import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import areIntlLocalesSupported from 'intl-locales-supported';
import { I18n, Trans } from 'react-i18next';


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
      to: null,
      validationMessage: '',
      errorName: '',
      errorValue: '',
      errorDate: '',
      errorRepetition: '',
      errorTo: null,
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

  handleTo = (event, to) => {
    this.setState({
      to,
    });
  };

  handleRepetition = (event, index, value) => {
    if(value === "Once"){
      this.setState({
        to: null
      });
    }
    this.setState({ repetition: value });
  }

  handleSave = () => {

    const {
      name, value, date, repetition, to
    } = this.state

    let errorValue = '';
    if (value) {
      errorValue = /^\d+$/.test(value) ? '' : 'Veuillez rentrer que des chiffres'
    } else {
      errorValue = 'Veuillez rentrer une valeur'
    }

    let needTo = this.state.repetition && this.state.repetition !== "Once"
    let errorTo = '';
    if (needTo && !to) {
      errorTo = 'Veuillez rentrer une date butoir'
    }

    this.setState({
      errorName: name ? '' : 'Veuillez rentrer un nom',
      errorValue,
      errorDate: date ? '' : 'Veuillez rentrer une date',
      errorRepetition: repetition ? '' : 'Veuillez rentrer une fréquence',
      errorTo
    });

    if (name && /^\d+$/.test(value) && date && repetition) {
      if (needTo && !to) {
        return
      }
      CreateResource(
        {
          name, value, date, repetition, to
        },
        () => {
          this.setState({
            validationMessage: <ValidationMessage theme={this.props.muiTheme}>Ressource enregistré <span role="img" aria-label="smiling face with sunglasses">😎</span></ValidationMessage>,
            name: '',
            value: '',
            date: null,
            repetition: '',
            to: ''
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
      <I18n>
        {
          (t, { i18n }) => (
            <Wrapper theme={this.props.muiTheme}>
              <Trans i18nKey="resource.add">
                Add a resource
              </Trans>
              {/* Ajouter une ressource */}
              {this.field('name', 'errorName', t('form.name'))}
              {this.field('value', 'errorValue', t('form.value'))}
              <DatePicker
                hintText={t('form.date')}
                mode="landscape"
                floatingLabelText={t('form.date')}
                value={this.state.date}
                onChange={this.handleDate}
                locale="fr"
                DateTimeFormat={DateTimeFormat}
                errorText={this.state.errorDate}
              />
              <SelectField
                floatingLabelText={t('form.repetition')}
                value={this.state.repetition}
                onChange={this.handleRepetition}
                errorText={this.state.errorRepetition}
              >
                <MenuItem value="Annual" primaryText={t('form.annual')} />
                <MenuItem value="Biannual" primaryText={t('form.biannual')} />
                <MenuItem value="Quarterly" primaryText={t('form.quarterly')} />
                <MenuItem value="Monthly" primaryText={t('form.monthly')} />
                <MenuItem value="Once" primaryText={t('form.once')} />
              </SelectField>
              {(!!this.state.repetition && this.state.repetition !== "Once") &&
                <DatePicker
                  hintText={t('form.to')}
                  mode="landscape"
                  floatingLabelText={t('form.to')}
                  value={this.state.to}
                  onChange={this.handleTo}
                  locale="fr"
                  DateTimeFormat={DateTimeFormat}
                  errorText={this.state.errorTo}
                  openToYearSelection
                />
              }
              {this.state.validationMessage}
              <Button label={t('actions.save')}  primary onClick={e => this.handleSave(e)} />
            </Wrapper>
          )
        }
      </I18n>
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
