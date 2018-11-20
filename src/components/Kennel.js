import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import { withRouter } from 'react-router-dom'

import "./kennel.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Search from '../modules/Search';

class Kennel extends Component {
  state = {
    results: []
  }
  doSearch = (queryString) => {
    this.props.history.push('/results')
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

export default withRouter(Kennel)
