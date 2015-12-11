import React from 'react';
import Relay from 'react-relay';

// A simple top-level component that illustrates how to render Relay-fetched
// data using props. In this case Relay will populate a `user` property that
// has a collection of `widgets` based on the queries and fragments we give it
// further below.
class Example extends React.Component {
  render() {
    return (
      <div>
        TEXT: { this.props.example.text }
      </div>
    );
  }
}
// The component we need to export is a Relay wrapper around our App component
// from above. It declares the GraphQL fragments where we list the properties
// we want to be fetched – eg, user.name, user.widgets.edges, etc
exports.Container = Relay.createContainer(Example, {
  fragments: {
    // The property name here reflects what is added to `this.props` above.
    // This template string will be parsed by babel-relay-plugin when we browserify.
    example: () => Relay.QL`
      fragment on Example {
        text,
        id
      }
    `
  }
});
