import React from 'react';
import Relay from 'react-relay';

class Contact extends React.Component {
  render() {
    return (
      <div>
        { this.props.example.text }
        { this.props.example.id }
      </div>
    );
  }
}

export default Relay.createContainer(Contact, {
  fragments: {
    example: () => Relay.QL`
      fragment on Example {
        text,
        id
      }
    `
  }
});
