import React, { Component } from 'react';

class SingleResult extends Component {

  render() {
    return (
      <li key={this.props.result.id}>{this.props.result.name}</li>
    )
  }
}

export default SingleResult