import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import Login from '../organisms/login';
import Main from '../organisms/main';
import Register from '../organisms/register';

storiesOf('Login', module)
  .addDecorator(muiTheme())
  .add('Base', () => (
    <Login />
  ))

storiesOf('Register', module)
  .addDecorator(muiTheme())
  .add('Base', () => (
    <Register />
  ))

storiesOf('Main', module)
  .addDecorator(muiTheme())
  .add('Base', () => (
    <Main />
  ))
  .add('Hearth', () => (
    <Main hearth />
  ))
