import React, { Component } from 'react';
import PropTypes from 'prop-types';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import MultilineChart from 'material-ui/svg-icons/editor/multiline-chart';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class SideNav extends Component {
  render() {
    console.log(this.props.disabled);
    const style = {
      wrapper: {
        order: '-1',
      },
      header: {
        fontSize: '16px',
        color: this.props.muiTheme.palette.primary1Color
      },
      item: {
        paddingLeft: this.props.muiTheme.spacing.desktopGutter
      }
    };

    const Item = text =>
      (<MenuItem
        primaryText={text}
        style={style.item}
        disabled={this.props.disabled}
      />)

    return (
      <Paper style={style.wrapper}>
        <Menu desktop={false}>
          <Subheader style={style.header}>GESTION</Subheader>
          {Item('Ressources')}
          {Item('Dépenses')}
          {Item('Budgets')}
          {Item('Epargnes')}
          <Divider />
          <Subheader style={style.header}>VISUALISER</Subheader>
          <MenuItem primaryText="Débits" leftIcon={<TrendingUp />} disabled={this.props.disabled} />
          <MenuItem primaryText="Crédits" leftIcon={<TrendingDown />} disabled={this.props.disabled} />
          <MenuItem primaryText="Compte-Rendu" leftIcon={<MultilineChart />} disabled={this.props.disabled} />
          <Divider />
        </Menu>
      </Paper>
    );
  }
}

SideNav.propTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.shape({
      primary1Color: PropTypes.string
    }),
    spacing: PropTypes.shape({
      desktopGutter: PropTypes.string
    })
  }),
  disabled: PropTypes.bool
};

export default muiThemeable()(SideNav);
