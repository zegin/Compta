import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import routes from './routes';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import { CONFIGURED } from './actions/types';
import cookie from 'react-cookies';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/bootstrap/css/bootstrap.min.css';
import jwtDecode from 'jwt-decode';



const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

if (cookie.load('token')) {
  store.dispatch({ type: AUTH_USER });
  if(jwtDecode(cookie.load('token', true))._doc.wage){
    store.dispatch({ type: CONFIGURED });
  }
}

ReactDOM.render(
  <AppContainer>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          <Router history={browserHistory} routes={routes} />
        </Provider>
      </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
    ReactDOM.render(
      <AppContainer>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
          </Provider>
        </MuiThemeProvider>
      </AppContainer>,
      document.getElementById('app')
    );
}
