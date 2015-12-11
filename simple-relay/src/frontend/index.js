import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

// purposefully calling Relay 'routes' roots (as in Query Root)
import ContactRoute from './routes/ContactRoute';
import Application from './components/Application';

class Root extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={ Application }
        route={ new ContactRoute() } />
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('container')
);
