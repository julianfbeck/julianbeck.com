import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        { this.props.children }
      </div>
    )
  }
}
