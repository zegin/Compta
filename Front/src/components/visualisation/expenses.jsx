import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import { TextField, DatePicker } from 'redux-form-material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Line} from 'react-chartjs-2';
import { getUserExpenses } from '../../actions';

const form = reduxForm({
  form: 'expense'
});

const style = {
  tableRow: {
    textAlign: 'center'
  },
  chart: {
    marginTop: '5vh'
  }
};

const error = { product: '', price: '' }
var expensePerMonth = Array(12).fill(0);
class Expenses extends Component {
  state = {user: jwtDecode(cookie.load('token', true))}

  componentDidMount() {
    this.props.getUserExpenses()
    this.setState({
      user: jwtDecode(cookie.load('token', true))
    })
    let userOrdered = this.state.user;
    userOrdered.expenses= userOrdered.expenses.sort((a,b)=> b.date - a.date)
    this.setState({
      user: userOrdered
    }, () => {
      console.log(new Date(this.state.user.expenses[0].date).getMonth());

      this.state.user.expenses.forEach((a)=>{
          expensePerMonth[new Date(a.date).getMonth()-1] = expensePerMonth[new Date(a.date).getMonth()-1] += a.price
      })
      console.log(expensePerMonth);
    })

    this.setState({
      data: {
        labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
        datasets: [{
            fill: 300,
            label: 'Débit total du mois',
            data: expensePerMonth,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }, {
          label: 'Salaire',
          data: Array(12).fill(this.state.user.wage),
          fill: false,
          borderColor: this.props.muiTheme.palette.primary1Color,
          radius: 0,
          borderWidth: 1
        }]
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Mes débits</h2>
        <Table height={"35vh"}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Produit</TableHeaderColumn>
              <TableHeaderColumn>Prix</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {this.state.user.expenses.map(({date, name, price, repetition}, index) =>
              <TableRow key={index}>
                <TableRowColumn>
                  {
                    (new Date(date)).toLocaleDateString('fr')
                  }
                </TableRowColumn>
                <TableRowColumn>{name}</TableRowColumn>
                <TableRowColumn>{price + "€"}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style={style.chart}>
            <Line data={this.state.data}/>
        </div>
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

Expenses = connect(mapStateToProps, { getUserExpenses })(form(Expenses));

Expenses.propTypes = {
  saveExpenses: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default muiThemeable()(Expenses)
