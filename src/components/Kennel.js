import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

import "./kennel.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Search from '../modules/Search';

class Kennel extends Component {

  doSearch(queryString) {
    let results = Search.getResults(queryString).then(r => r)

    console.log("Search Results", results)
  }

  render() {
    return (

      <React.Fragment>
        <NavBar doSearch={this.doSearch} />
        <ApplicationViews />
      </React.Fragment>

    );
  }
}

export default Kennel
