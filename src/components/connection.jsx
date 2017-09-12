import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Connection extends React.Component {
  constructor(props) {
    super(props);
  }
  connect(bool) {
    this.props.handleConnection(bool)
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label="Connection" primary={true} onClick={(a)=>{this.connect(true)}}/>
          <h2>Connection</h2>
        </div>
      </MuiThemeProvider>
    )
  }
}
