import React from 'react';
import { Route, IndexRoute } from 'react-router';
import cookie from 'react-cookies';

import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

// import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';

if (cookie.load('token')) {
  var token = cookie.load('token');
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={token ? RequireAuth(Dashboard) : Login} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
