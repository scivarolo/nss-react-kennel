import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {
  state = {
    inputValue: ""
  }

  updateValue(e) {
    this.setState({inputValue: e.target.value})
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
              e.preventDefault()
              console.log(this.state.inputValue)
              this.props.doSearch(this.state.inputValue)
            }
          }>
          <input type="text" value={this.state.inputValue} onChange={e => this.updateValue(e)}className="form-control" placeholder="Search" />
        </form>
      </nav>
    )
  }

}

export default NavBar