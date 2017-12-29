import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cookie from 'react-cookies';
import Main from './organisms/main'
import Auth from './templates/auth';
import Dashboard from './templates/dashboard';

let token = 0;

if (cookie.load('token')) {
  token = cookie.load('token')
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
      connected: true
    }, this.forceUpdate())
  }
  render() {
    let content = 0;
    if (this.state.connected) {
      if (this.state.hearth) {
        content = <Dashboard />
      } else {
        content = <h1>HEARTH</h1>
      }
    } else {
      content = <Auth handleConnection={() => this.handleConnection()} />
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Main>
          {content}
        </Main>
      </MuiThemeProvider>
    )
  }
}
