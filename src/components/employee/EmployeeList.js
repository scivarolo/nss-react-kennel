import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class EmployeeList extends Component {
  render() {
    return (
      <section className="employees container mt-5">
        <div className="row">
          <div className="col-md-10">
            <h1 className="mb-4">Employees</h1>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary float-right" to="/employees/new">Add New Hire</Link>
          </div>
        </div>
        <div className="card-columns">
        {
          this.props.employees.map(employee => {
            return (
              <div key={employee.id} className="card mb-3">
                <div className="card-body">
                  <h4 className="card-title">{employee.name}</h4>
                  <Link className="btn btn-sm btn-info mr-1" to={`/employees/${employee.id}`}>Details</Link>
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.fireEmployee(employee.id)}>Fire</button>
                </div>
              </div>
            )
          })
        }
        </div>
      </section>
    )
  }
}

export default EmployeeList