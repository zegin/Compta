import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import MultilineChart from 'material-ui/svg-icons/editor/multiline-chart';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    // if (cookie.load('token', false)) { this.state = { user: jwtDecode(cookie.load('token', false)) } }

    console.log(props.muiTheme)
  }
  handleToggle() {
    this.setState({ open: !this.state.open })
  }
  render() {
    const style = {
      container: {
        display: 'flex', /* crée un contexte flex pour ses enfants */
        flexDirection: 'column', /* affichage vertical */
        minHeight: 'calc(100vh - 34px)', /* toute la hauteur du viewport */
      },
      wrapper: {
        flex: '1 1 auto',
        display: 'flex'
      },
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
      nav: {
        order: '-1',
      },
      contents: {
        flex: '1',
        padding: '1em'
      },
      menuSubHeader: {
        fontSize: '16px',
        color: this.props.muiTheme.palette.primary1Color
      },
      footer: {
        padding: '.5rem',
        color: this.props.muiTheme.palette.textColor,
        display: 'flex',
        flexDirection: 'row'
      },
      footerLeft: {
        flex: '1 1 auto',
        alignSelf: 'flex-start',
      },
      footerRight: {
        flex: '1 1 auto',
        alignSelf: 'flex-end',
        textAlign: 'right'
      }
    };

    return (
      <Paper style={style.container}>
        <AppBar title="Compta" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={() => this.handleToggle()} />
        <div style={style.wrapper}>
          <Drawer open={this.state.open} docked={false} onRequestChange={open => this.setState({ open })}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem onClick={() => this.logout()}>Déconnection</MenuItem>
          </Drawer>
          <Paper style={style.nav}>
            <Menu desktop={false}>
              <Subheader style={style.menuSubHeader}>Ajouter</Subheader>
              <MenuItem primaryText="Débit" leftIcon={<ArrowForward />} disabled={!this.props.hearth} />
              <MenuItem primaryText="Crédit" leftIcon={<ArrowBack />} disabled={!this.props.hearth} />
              <Divider />
              <Subheader style={style.menuSubHeader}>Visualiser</Subheader>
              <MenuItem primaryText="Débits" leftIcon={<TrendingUp />} disabled={!this.props.hearth} />
              <MenuItem primaryText="Crédits" leftIcon={<TrendingDown />} disabled={!this.props.hearth} />
              <MenuItem primaryText="Compte-Rendu" leftIcon={<MultilineChart />} disabled={!this.props.hearth} />
              <Divider />
            </Menu>
          </Paper>
          <div className="content" style={style.contents}>
            {this.props.children}
          </div>
        </div>
        <Paper style={style.footer} zDepth={2}>
          <span style={style.footerLeft}>v0.0.5</span>
          <span style={style.footerRight} >Par Gilian GONNORD</span>
        </Paper>
      </Paper>
    );
  }
}

Main.propTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.shape({
      primary1Color: PropTypes.string,
      textColor: PropTypes.string
    })
  }),
  hearth: PropTypes.bool
};

export default muiThemeable()(Main);
