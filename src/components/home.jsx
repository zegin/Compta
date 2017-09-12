import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/sub">Sub</Link>
      </div>
    )
  }
}
