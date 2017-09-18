import React from 'react';
import { Route, IndexRoute } from 'react-router';
import cookie from 'react-cookies';
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';
import Auth from './components/auth/auth';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';
import RequireConfig from './components/auth/require-config';
import Configure from './components/account/configure'
if (cookie.load('token')) {
  var token = cookie.load('token');
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={token ? RequireAuth(RequireConfig(Dashboard)) : Auth} />
    <Route path="dashboard" component={RequireAuth(RequireConfig(Dashboard))} />
    <Route path="configure" component={RequireAuth(Configure)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
