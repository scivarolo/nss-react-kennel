import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
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
      </nav>
    )
  }

}

export default NavBar