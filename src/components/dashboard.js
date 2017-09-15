import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
// import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.protectedTest();
    this.state = {user: jwtDecode(cookie.load('token', false))}
  }

  renderContent() {
    if(this.props.content) {
      return (
        <p>{this.props.content}</p>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        <h1>Dashboard</h1>
        <h2>Welcome {this.state.user.firstName}</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);
