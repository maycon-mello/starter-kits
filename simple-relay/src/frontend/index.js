// This file is the entry point on the browser

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Example from './components/Example';
import AppHomeRoute from './routes/AppHomeRoute';


// At the top of a Relay tree is the root container, which we pass our
// wrapped App component to, as well as the query configuration ("route"). If
// we need to render a different component, say as a result of a navigation
// event, then we would update it here.
// It also illustrate the use of the onReadyStateChange handler in case
// there's a network error
ReactDOM.render(
  <Relay.RootContainer
    Component={Example.Container}
    route={new AppHomeRoute()}
    onReadyStateChange={({error}) => { if (error) console.error(error) }}
  />,
  document.getElementById('container')
);
