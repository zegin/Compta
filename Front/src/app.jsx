import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import '../styles/index.scss';
import reducers from './reducers/index';
import Main from './components/main'
import { AUTH_USER, CONFIGURED } from './actions/types';
import Auth from './components/auth/auth';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';
import RequireConfig from './components/auth/require-config';
import Configure from './components/account/configure'
import Expense from './components/treatment/expense'
import Expenses from './components/visualisation/expenses'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
let token = '';

if (cookie.load('token')) {
  store.dispatch({ type: AUTH_USER });
  token = cookie.load('token');
  if (jwtDecode(cookie.load('token', true))._doc.wage) {
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
                <Route exact path="/" component={token ? RequireAuth(RequireConfig(Dashboard)) : Auth} />
                <Route path="/dashboard" component={RequireConfig(Dashboard)} />
                <Route path="/configure" component={RequireAuth(Configure)} />
                <Route path="/expense" component={RequireConfig(Expense)} />
                <Route path="/expenses" component={RequireConfig(Expenses)} />
                <Route path="/*" component={RequireConfig(Dashboard)} />
              </Switch>
            </Main>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
