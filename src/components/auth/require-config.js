import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Configuration extends Component {
    static contextTypes = {
      router: React.PropTypes.object
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

  return connect(mapStateToProps)(Configuration);
}
