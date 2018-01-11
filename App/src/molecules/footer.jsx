import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Footer extends Component {
  render() {
    const style = {
      wrapper: {
        padding: '.5rem',
        color: this.props.muiTheme.palette.textColor,
        display: 'flex',
        flexDirection: 'row'
      },
      left: {
        flex: '1 1 auto',
        alignSelf: 'flex-start',
      },
      right: {
        flex: '1 1 auto',
        alignSelf: 'flex-end',
        textAlign: 'right'
      }
    };
    return (
      <Paper style={style.wrapper} zDepth={2}>
        <span style={style.left}>v0.0.5</span>
        <span style={style.right} >Par Gilian GONNORD</span>
      </Paper>
    );
  }
}

Footer.propTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.shape({
      textColor: PropTypes.string
    })
  })
};

export default muiThemeable()(Footer)
