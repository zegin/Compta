import React from 'react';
import { Route, IndexRoute } from 'react-router';
import cookie from 'react-cookies';
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';
import Auth from './components/auth/auth';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';

if (cookie.load('token')) {
  var token = cookie.load('token');
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={token ? RequireAuth(Dashboard) : Auth} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
