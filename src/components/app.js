import React, { Component } from 'react';
import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';



const style = {
  container: {
    display: 'flex', /* crée un contexte flex pour ses enfants */
    flexDirection: 'column', /* affichage vertical */
    minHeight: '100vh', /* toute la hauteur du viewport */
  },
  wrapper: {
    flex : '1 1 auto',
    display : 'flex'
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  nav: {
    order: '-1',
  },
  contents: {
    flex: '1',
    padding: '1em'
  },

};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    if(cookie.load('token', false)){this.state = {user : jwtDecode(cookie.load('token', false))}}
  }
  handleToggle = () => this.setState({open: !this.state.open})
  logout() {
    cookie.remove('token')
    window.location.href = 'http://localhost:8888/'
  }
  componentWillMount(){
  }
  render() {
    return (
        <Paper style={style.container}>
          <AppBar title="Compta" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={()=>this.handleToggle()} />
          <div style={style.wrapper}>
            <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
              <MenuItem>Menu Item</MenuItem>
              <MenuItem  onClick={()=>this.logout()}>Déconnection</MenuItem>
            </Drawer>
            <Paper style={style.nav}>
              <Menu desktop={false}>
                <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
                <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
                <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
                <Divider />
                <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
                <MenuItem primaryText="Download" leftIcon={<Download />} />
                <Divider />
                <MenuItem primaryText="Remove" leftIcon={<Delete />} />
              </Menu>
            </Paper>
            <div className="content" style={style.contents}>
              {this.props.children}
            </div>
          </div>
          <p>Footer here</p>
        </Paper>
    );
  }
}

export default App;
