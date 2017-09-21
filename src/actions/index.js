import axios from 'axios';
// import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  PROTECTED_TEST,
  CONFIGURED} from './types';
import querystring from 'querystring';
const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:8888';

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/';
  }
}


export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ user, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/authenticate`, querystring.stringify({ user, password }))
    .then(response => {
      if(response.data.success){
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      }
      else {
        console.log("Si pas success")
        console.log(response.data)
        dispatch({
          type: AUTH_ERROR,
          payload: response.data
        })
      }
    })
    .catch((error) => {
      console.log("Si erreur")
      console.log(error)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function registerUser({ name, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/register`, querystring.stringify({ name, firstName, lastName, password }))
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      console.log(error)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function protectedTest() {
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: {
        'postman-token': 'c5511295-f8dd-2aa2-71be-4b15de28fa9c',
        'cache-control': 'no-cache',
        'x-access-token': cookie.load('token')
      }
    })
    .then(response => {
      if(response.data.success){
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data.content
        });
      }
      else{
        cookie.remove('token', { path: '/' });
        window.location.href = CLIENT_ROOT_URL + '/';
      }
    })
    .catch((error) => {
      console.log("protectedTest not passed")
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function configureUser({hearth, newHearth, wage, budget, saving}) {
  return function(dispatch) {
    axios.post(`${API_URL}/configure`, querystring.stringify({token: cookie.load('token'), hearth, newHearth, wage, budget, saving}))
    .then(response => {
      if(response.data.success){
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({
          type: CONFIGURED
        });
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      }
      else{
        console.log('pas success');
      }
    })
    .catch((error) => {
      console.log(error)
      // errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}
