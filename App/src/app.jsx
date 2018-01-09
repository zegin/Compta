import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cookie from 'react-cookies';
import Main from './organisms/main'
import Auth from './templates/auth';
import Dashboard from './templates/dashboard';
import Hearth from './templates/hearth';

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
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Main hearth={this.state.hearth}>
          {content}
        </Main>
      </MuiThemeProvider>
    )
  }
}
