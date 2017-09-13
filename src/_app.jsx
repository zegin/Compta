import React from 'react';
import '../styles/index.scss';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import Home from './components/home.jsx'
import Sub from './components/sub.jsx'
import Connection from './components/connection.jsx'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {connected: false};
  }

  handleConnection(bool){
    this.setState({connected : bool})
  }

  render() {
    console.log(this.state.connected)
    if(this.state.connected){
      return (
        <MuiThemeProvider>
          <Paper zDepth={1}>
            <AppBar
              title="App"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Router>
              <div>
                <Route exact path="/" component={Home}/>
                <Route path="/sub" component={Sub}/>
              </div>
            </Router>
          </Paper>
        </MuiThemeProvider>
      )
    }
    else {
      return (
        <Connection handleConnection={this.handleConnection.bind(this)}/>
      )
    }

  }
}
