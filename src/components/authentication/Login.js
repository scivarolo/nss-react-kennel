import React, { Component } from 'react'

class Login extends Component {

  //Initial State
  state = {
    email: "",
    password: "",
    remember: false
  }

  // Update State when inputs are edited
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    this.setState(stateToChange)
  }

  handleLogin = e => {
    e.preventDefault()

    if (this.state.remember) {
      localStorage.setItem(
        "credentials",
        JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      )
    } else {
      // For now, store in sessionstorage
      sessionStorage.setItem(
        "credentials",
        JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      )
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3">Please sign in</h1>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input className="form-control" onChange={this.handleFieldChange} type="email" id="email" placeholder="animal@kennel.com" required autoFocus />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" onChange={this.handleFieldChange} type="password" id="password" required />
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input className="custom-control-input" type="checkbox" id="remember" onChange={this.handleFieldChange} />
            <label className="custom-control-label" htmlFor="remember">Remember Me</label>
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}

export default Login