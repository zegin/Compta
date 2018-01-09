import axios from 'axios';
import querystring from 'querystring'
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

export function CreateUser(firstName, lastName, user, password, callback) {
  axios.post('http://localhost:3000/api/register', querystring.stringify({
    firstName, lastName, user, password
  }))
    .then((response) => {
      if (response.data.success) {
        cookie.save('token', jwt.decode(response.data.token), { path: '/' });
        callback()
      } else {
        this.setState({
          errorUser: response.data.type === 'user' ? response.data.message : '',
          errorPassword: response.data.type === 'password' ? response.data.message : ''
        });
      }
    })
    .catch((error) => {
      console.log(error)
    });
}

export function LoginUser(user, password, callback) {
  axios.post('http://localhost:3000/api/authenticate', querystring.stringify({ user, password }))
    .then((response) => {
      if (response.data.success) {
        cookie.save('token', jwt.decode(response.data.token), { path: '/' });
        callback()
      } else {
        this.setState({
          errorUser: response.data.type === 'user' ? response.data.message : '',
          errorPassword: response.data.type === 'password' ? response.data.message : ''
        });
      }
    })
    .catch((error) => {
      console.log(error)
    });
}

export function CreateHearth(hearth, callback) {
  const token = jwt.sign(cookie.load('token'), 'superSecret')
  axios.post('http://localhost:3000/api/createHearth', querystring.stringify({ token, hearth }))
    .then((response) => {
      console.log(response);
      cookie.save('token', jwt.decode(response.data.token), { path: '/' });
      callback()
    })
    .catch((error) => {
      console.log(error)
    });
}

export function LinkHearth(hearth, callback, errHandler) {
  const token = jwt.sign(cookie.load('token'), 'superSecret')

  axios.post('http://localhost:3000/api/linkHearth', querystring.stringify({ token, hearth }))
    .then((response) => {
      if (!response.data.success) {
        errHandler(response.data.content)
      } else {
        cookie.save('token', jwt.decode(response.data.token), { path: '/' });
        callback()
      }
    })
    .catch((error) => {
      console.log(error)
    });
}
