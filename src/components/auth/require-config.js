import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Configuration extends Component {
    static contextTypes = {
      configured: PropTypes.object.isRequired,
      router: PropTypes.object
    }

    componentWillMount() {
      console.log(this.props)
      if(!this.props.configured) {
        this.context.router.push('/configure');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.configured) {
        this.context.router.push('/configure');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { configured: state.configure.configured };
  }

  Configuration.propTypes = {
    configured: PropTypes.object.isRequired
  };

  return connect(mapStateToProps)(Configuration);
}
