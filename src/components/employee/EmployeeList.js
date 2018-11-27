import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EmployeeCard from './EmployeeCard'

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
            return <EmployeeCard key={employee.id} employee={employee} {...this.props} />
          })
        }
        </div>
      </section>
    )
  }
}

export default EmployeeList