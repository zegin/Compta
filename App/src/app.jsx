import React from 'react';
import cookie from 'react-cookies';
import { Route, BrowserRouter } from 'react-router-dom'
import { I18n } from 'react-i18next';

import i18n from './i18n'; // initialized i18next instance using reactI18nextModule


import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from './templates/auth';
import Dashboard from './templates/dashboard';
import Hearth from './templates/hearth';
import Resource from './organisms/resource'
import Footer from './molecules/footer'
import SideNav from './molecules/sideNav'


let token = 0;

if (cookie.load('token')) {
  token = cookie.load('token')
  console.log(token);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: !!token,
      hearth: token ? !!token.hearth : false
    };
  }
  handleConnection = () => {
    this.setState({
      connected: true,
      hearth: !!cookie.load('token').hearth
    }, this.forceUpdate())
  }
  handleHearth= () => {
    this.setState({
      hearth: true
    }, this.forceUpdate())
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

    let content = 0;
    if (this.state.connected) {
      if (this.state.hearth) {
        content = <Dashboard token={token} />
      } else {
        content = <Hearth handleHearth={() => this.handleHearth()} token={token} />
      }
    } else {
      content = <Auth handleConnection={() => this.handleConnection()} />
    }
    const mySideNav = props => (
      <SideNav disabled={!this.state.hearth} {...props} />
    )
    return (
      <I18n>
        {
          (t, { i18n }) => (
            <BrowserRouter>
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Paper style={style.container}>
                  <AppBar title="Compta" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={() => this.handleToggle()} />
                  <Route>
                    <div style={style.wrapper}>
                      <Route path="/" render={mySideNav} />
                      <div className="content" style={style.contents}>
                        <Route path="/resource" component={Resource} />
                        <Route exact path="/" render={() => content} />
                      </div>
                    </div>
                  </Route>
                  <Footer />
                </Paper>
              </MuiThemeProvider>
            </BrowserRouter>
          )
        }
      </I18n>
        )
  }
}
