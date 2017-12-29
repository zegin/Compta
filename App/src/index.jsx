import React, { ReactDOM } from 'react';
import { render } from 'react-dom';
import App from './app';

class Index extends React.Component {
  render() {
    return <App />;
  }
}

render(<Index />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(
      <div>
        <h1>App</h1>
      </div>,
      document.getElementById('app')
    );
  });
}
