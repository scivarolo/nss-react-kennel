import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

import "./kennel.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Search from '../modules/Search';

class Kennel extends Component {
  state = {
    results: []
  }
  doSearch = (queryString) => {
    return Search.getResults(queryString).then(r => this.setState({results: r}))
  }

  render() {
    return (

      <React.Fragment>
        <NavBar doSearch={this.doSearch} />
        <ApplicationViews searchResults={this.state.results} />
      </React.Fragment>

    );
  }
}

export default Kennel