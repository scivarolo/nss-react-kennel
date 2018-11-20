import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {
  state = {
    inputValue: "",
  }

  updateValue(e) {
    this.setState({inputValue: e.target.value})
  }

  submitSearch(e) {
    e.preventDefault()
    this.props.history.push('/results')
    return this.props.doSearch(this.state.inputValue)
  }

  render() {

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top shadow">
        <span className="navbar-brand">Kennel</span>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">Locations</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/animals">Animals</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/employees">Employees</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/owners">Owners</NavLink>
          </li>
        </ul>
        <form className="form-inline ml-3" onSubmit={(e) => {
              this.submitSearch(e)
            }
          }>
          <input type="text" value={this.state.inputValue}
          onChange={e => this.updateValue(e)}className="form-control" placeholder="Search" />
        </form>
      </nav>
    )
  }

}

export default withRouter(NavBar)