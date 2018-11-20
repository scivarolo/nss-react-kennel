import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

class SearchResults extends Component {
  render() {
    if(this.props.results.length) {
      return (
        <div className="search-results container mt-5">
          <h1>Search Results</h1>
          {
            this.props.results.map(resultSection => {
              return <ul key={this.props.results.indexOf(resultSection)}>
                {
                  resultSection.map(result => {
                    return <li key={result.id}>{result.name}</li>
                  })
                }
              </ul>
            })
          }
        </div>
      )
    } else {
      return (
        <div className="search-results container mt-5">
          <h1>Search Results</h1>
          <p>There are no results.</p>
        </div>
      )
    }
  }
}

export default SearchResults