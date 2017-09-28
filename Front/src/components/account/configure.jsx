import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TextField,
  SelectField
} from 'redux-form-material-ui'
import { Doughnut } from 'react-chartjs-2';
import { configureUser } from '../../actions';

const form = reduxForm({
  form: 'configure'
});

const error = { wage: '', hearth: '', budget: '', select: '', saving: '' }
const stateHide = { opacity: 0, display: 'none' }
let doughnut = null;


class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = { user: jwtDecode(cookie.load('token', true))._doc, value: null, wage: null, budget: null, saving: null, doughnutData: null }
  }

  handleChange(evt, val) {
    this.setState({ value: val }, function () {
      if (this.state.value === -1) {
        stateHide.display = 'block'
        stateHide.opacity = 1
        this.forceUpdate()
      } else {
        stateHide.display = 'none'
        stateHide.opacity = 0
        this.forceUpdate()
      }
    })
  }

  doughnutUpdate() {
    if (this.state.wage && this.state.budget && this.state.saving) {
      doughnut = (<Doughnut data={{
        labels: [
          'Budget',
          'Epargne',
          'Restant'
        ],
        datasets: [{
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          data: [
            parseInt(this.state.budget, 10),
            parseInt(this.state.saving, 10),
            parseInt(this.state.wage, 10) - (parseInt(this.state.budget, 10) + parseInt(this.state.saving, 10))
          ]
        }]
      }}
      />)
      this.forceUpdate();
    }
  }

  handleWage = (evt, val) => this.setState({ wage: val }, () => this.doughnutUpdate())
  handleBudget = (evt, val) => this.setState({ budget: val }, () => this.doughnutUpdate())
  handleSaving = (evt, val) => this.setState({ saving: val }, () => this.doughnutUpdate())


  handleFormSubmit(formProps) {
    if (this.validate(formProps)) {
      this.props.configureUser(formProps);
    }
  }

  validate(formProps) {
    if (!this.state.value) {
      error.select = 'Merci de remplir se champ';
    }
    if (formProps.wage) {
      if (/(\D)/g.test(formProps.wage)) {
        error.wage = 'Ne rentrez que des chifres svp'
      }
    }
    if (formProps.budget) {
      if (/(\D)/g.test(formProps.budget)) {
        error.budget = 'Ne rentrez que des chifres svp'
      }
    }
    if (formProps.saving) {
      if (/(\D)/g.test(formProps.saving)) {
        error.saving = 'Ne rentrez que des chifres svp'
      }
    }
    if (formProps.newHearth) {
      if (!/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(formProps.newHearth)) {
        error.hearth = 'Ne rentrez aucun caractère spécial svp'
      }
    }
    return true
  }

  render() {
    const style = {
      container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '[first] 30rem [second] 30rem [end]',
        gridTemplateRows: '[row1] auto [row2] auto [row3] auto [row4] auto [row5]',
        gridColumnGap: '3rem',
        padding: '1rem'
      },
      full: {
        gridColumn: 'first / second'
      },
      stateHide: {
        display: stateHide.display,
        opacity: stateHide.opacity,
        transition: 'opacity .7s',
        gridColumn: 'second / end',
        gridRowEnd: 'row1'
      },
      button: {
        margin: '12px'
      },
      doughnut: {
        gridColumn: 'second / end',
        gridRow: ' row2 / row5',
        alignSelf: 'center',
        margin: 'auto'
      },
      row1: {
        gridRow: ' row1 / row2'
      },
      row2: {
        gridRow: ' row2 / row3'
      },
      row3: {
        gridRow: ' row3 / row4'
      }
    }

    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Bienvenue {this.state.user.firstName}</h2>
        <p>Pour votre première connection, nous allons configurer votre compte</p>
        <form style={style.container} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div style={Object.assign({}, style.full, style.row1)}>
            <Field
              name="hearth"
              component={SelectField}
              floatingLabelText="Dans quel foyez êtes vous ?"
              onChange={this.handleChange.bind(this)}
              errorText={error.select}
            >
              <MenuItem value="GigiCaro" primaryText="GigiCaro" />
              <MenuItem value={-1} primaryText="Aucun" />
            </Field>
          </div>
          <div style={Object.assign({}, style.stateHide, style.row1)}>
            <Field name="newHearth" component={TextField} type="text" floatingLabelText="Entrez une nouveau foyer" hintText="votre foyer" errorText={error.hearth} required={this.state.value === -1} />
          </div>
          <div style={style.doughnut}>
            {doughnut}
          </div>
          <div style={Object.assign({}, style.full, style.row2)}>
            <Field name="wage" component={TextField} type="text" hintText="Entrez votre salaire net " floatingLabelText="Salaire mensuel" errorText={error.wage} required onChange={this.handleWage.bind(this)} />
          </div>
          <div style={Object.assign({}, style.full, style.row3)}>
            <Field
              name="budget"
              component={TextField}
              type="text"
              hintText="Entrez votre budget"
              floatingLabelText="Budget mensuel (optionnel)"
              errorText={error.budget}
              onChange={this.handleBudget.bind(this)}
            />
          </div>
          <div style={style.full}>
            <Field
              name="saving"
              component={TextField}
              type="text"
              hintText="Entrez votre epargne"
              floatingLabelText="Epargne mensuel (optionnel)"
              errorText={error.saving}
              onChange={this.handleSaving.bind(this)}
            />
          </div>
          <div style={Object.assign({}, style.full, style.button)}>
            <RaisedButton label="Sauvegarder" primary style={style} type="submit" />
          </div>
        </form>

      </div>
    );
  }
}

Configure.propTypes = {
  configureUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func
};


function mapStateToProps(state) {
  return {
    errorMessage: state.configure.error,
    message: state.configure.message
  };
}
Configure = connect(mapStateToProps, { configureUser })(form(Configure));
export default Configure
