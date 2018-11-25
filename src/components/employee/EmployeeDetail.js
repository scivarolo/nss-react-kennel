import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EmployeeDetail extends Component {

  render() {
    const employee = this.props.employees.find(employee => employee.id === parseInt(this.props.match.params.employeeId))

    return (
      <section className="employee container">
        <div key={employee.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {employee.name}
            </h4>
            <Link className="card-link" to="/animals" onClick={() => this.props.fireEmployee(employee.id)}>Delete</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default EmployeeDetail