import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Footer from '../molecules/footer'
import SideNav from '../molecules/sideNav'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
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
      contents: {
        flex: '1',
        padding: '1em'
      }
    };

    return (
      <Paper style={style.container}>
        <AppBar title="Compta" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={() => this.handleToggle()} />
        <div style={style.wrapper}>
          {/* <Drawer open={this.state.open} docked={false} onRequestChange={open => this.setState({ open })}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem onClick={() => this.logout()}>Déconnection</MenuItem>
          </Drawer> */}
          <SideNav disabled={!this.props.hearth} />
          <div className="content" style={style.contents}>
            {this.props.children}
          </div>
        </div>
        <Footer />
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
