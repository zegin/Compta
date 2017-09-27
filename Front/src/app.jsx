import React from 'react';
import '../styles/index.scss';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Main from './components/main'
import { AUTH_USER } from './actions/types';
import { CONFIGURED } from './actions/types';
import Auth from './components/auth/auth';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';
import RequireConfig from './components/auth/require-config';
import Configure from './components/account/configure'
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = () => (
  <div>
    <h2>Topic</h2>
  </div>
)

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

if (cookie.load('token')) {
  store.dispatch({ type: AUTH_USER });
  var token = cookie.load('token');
  if(jwtDecode(cookie.load('token', true))._doc.wage){
    store.dispatch({ type: CONFIGURED });
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router>
          <Main>
            <Switch>
              <Route exact path="/" component={token ? RequireAuth(RequireConfig(Dashboard)) : Auth}/>
              <Route path="/dashboard" component={RequireConfig(Dashboard)}/>
              <Route path="/configure" component={RequireAuth(Configure)}/>
            </Switch>
          </Main>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
