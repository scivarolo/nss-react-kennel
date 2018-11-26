import React, { Component } from 'react'

class OwnerForm extends Component {
  state = {
    ownerName: "",
    phone: ""
  }

  handleFieldChange = e => {
    const stateChange = {}
    stateChange[e.target.id] = e.target.value
    this.setState(stateChange)
  }

  constructNewOwner = e => {
    e.preventDefault()

    const owner = {
      name: this.state.ownerName,
      phone: this.state.phone
    }

    this.props.addOwner(owner)
      .then(() => this.props.history.push("/owners"))

  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h2>Add New Owner</h2>
        </div>
        <form className="ownerForm">
          <div className="form-group">
            <label htmlFor="ownerName">Owner Name</label>
            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="ownerName" placeholder="Owner Name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" required className="form-control" onChange={this.handleFieldChange} id="phone" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.constructNewOwner}>Add New Owner</button>
        </form>
      </div>
    )
  }
}

export default OwnerForm