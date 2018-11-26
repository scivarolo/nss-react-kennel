import React, { Component } from 'react'

class EmployeeForm extends Component {

  state = {
    employeeName: "",
    startDate: ""
  }

  handleFieldChange = e => {
    const stateChange = {}
    stateChange[e.target.id] = e.target.value
    this.setState(stateChange)
  }

  constructNewEmployee = e => {
    e.preventDefault()

    const employee = {
      name: this.state.employeeName,
      startDate: this.state.startDate
    }

    this.props.addEmployee(employee)
    .then(() => this.props.history.push("/employees"))

  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h2>Add New Employee</h2>
        </div>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name</label>
            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="employeeName" placeholder="Employee Name" />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" required className="form-control" onChange={this.handleFieldChange} id="startDate" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.constructNewEmployee}>Add New Hire</button>
        </form>
      </div>
    )
  }
}

export default EmployeeForm;