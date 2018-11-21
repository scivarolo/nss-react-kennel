import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class EmployeeList extends Component {
  render() {
    return (
      <section className="employees container mt-5">
        <h1>Employees</h1>
        {
          this.props.employees.map(employee =>
            <div key={employee.id} className="mb-3">
              <h4>{employee.name}</h4>
              <Link className="btn btn-sm btn-info mr-1" to={`/employees/${employee.id}`}>Details</Link>
              <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.fireEmployee(employee.id)}>Fire</button>
            </div>
          )
        }
      </section>
    )
  }
}

export default EmployeeList