import React, { Component } from 'react';
import SingleResult from "./SingleResult"

class ResultSection extends Component {

  render() {
    return (
      <div>
        <h3>{this.props.sectionName}</h3>
        <ul>
          {
            this.props.results.map(result => {
              return <SingleResult key={this.props.results.indexOf(result)} result={result} />
            })
          }
        </ul>
      </div>
    )
  }

}

export default ResultSection