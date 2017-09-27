import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Configuration extends Component {
    static contextTypes = {
      configured: PropTypes.bool,
      router: PropTypes.object
    }

    componentWillMount() {
      console.log(this.props)
      if(!this.props.configured) {
        this.context.router.history.push('/configure');
      }
    }

    componentWillUpdate(nextProps) {
      console.log(this.props)
      if(!nextProps.configured) {
        this.context.router.history.push('/configure');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    console.log(state)
    return { configured: state.configure.configured };
  }

  Configuration.propTypes = {
    configured: PropTypes.bool
  };

  return connect(mapStateToProps)(Configuration);
}
