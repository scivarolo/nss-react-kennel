import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import ResultSection from "./ResultSection"

class SearchResults extends Component {
  state = {
    searchSections: [
      "Animals",
      "Locations",
      "Employees"
    ]
  }
  render() {
    if(this.props.results.length) {
      return (
        <div className="search-results container mt-5">
          <h1>Search Results</h1>
          {
            this.props.results.map((resultSection, index) => {
              return <ResultSection key={index} results={resultSection} sectionName={this.state.searchSections[index]} />
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