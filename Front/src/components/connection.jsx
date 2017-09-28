import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class Connection extends React.Component {
  connect(bool) {
    this.props.handleConnection(bool)
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label="Connection" primary onClick={() => { this.connect(true) }} />
          <h2>Connection</h2>
        </div>
      </MuiThemeProvider>
    )
  }
}

Connection.propTypes = {
  handleConnection: PropTypes.func.isRequired
};
