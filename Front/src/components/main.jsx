import React, { Component } from 'react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import MultilineChart from 'material-ui/svg-icons/editor/multiline-chart';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
// import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';



class Main extends Component {
  logout() {
    cookie.remove('token')
    window.location.href = 'http://localhost:8888/'
  }
  constructor(props) {
    super(props);
    this.state = { open: false };
    if (cookie.load('token', false)) { this.state = { user: jwtDecode(cookie.load('token', false)) } }

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
        minHeight: '98vh', /* toute la hauteur du viewport */
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
              <MenuItem primaryText="Débit" leftIcon={<ArrowForward />} containerElement={<Link to="/expense" />} />
              <MenuItem primaryText="Crédit" leftIcon={<ArrowBack />} />
              <Divider />
              <Subheader style={style.menuSubHeader}>Visualiser</Subheader>
              <MenuItem primaryText="Débits" leftIcon={<TrendingUp />} containerElement={<Link to="/expenses" />} />
              <MenuItem primaryText="Crédits" leftIcon={<TrendingDown />} />
              <MenuItem primaryText="Compte-Rendu" leftIcon={<MultilineChart />} />
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

export default muiThemeable()(Main);
