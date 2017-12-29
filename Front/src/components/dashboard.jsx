import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { css } from 'glamor'
import * as actions from '../actions';
// import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.protectedTest();
    this.state = { user: jwtDecode(cookie.load('token', true))._doc }
  }

  renderContent() {
    if (this.props.content) {
      return (
        <p>{this.props.content}</p>
      );
    }
  }

  render() {

    let blockquote = css({
      background: '#f9f9f9',
      borderLeft: '10px solid #ccc',
      margin: '1.5em 10px',
      padding: '.5em 10px',
      width: '34rem',
      lineHeight: '1.5rem',
      textAlign: 'justify',
      ':before': {
        color: '#ccc',
        content: 'open-quote',
        fontSize: '4em',
        lineHeight: '0.1em',
        marginRight: '0.25em',
        verticalAlign: '-0.4em'
      }
    })

    let p = css({
      display: 'inline',
    })

    return (
      <div>
        {this.renderContent()}
        <h1>Tableau de bord</h1>
        <h2>Bienvenue {this.state.user.firstName}</h2>
        <blockquote {...blockquote}><p {...p}>
          Il est plus impressionant de faire des choses incroyables avec des techniques simples,
          que des choses simples avec des techniques incroyables.
        </p></blockquote>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

Dashboard.propTypes = {
  protectedTest: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default connect(mapStateToProps, actions)(Dashboard);
