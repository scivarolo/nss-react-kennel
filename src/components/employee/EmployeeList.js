import React, { Component } from 'react'

class EmployeeList extends Component {
  render() {
    return (
      <section className="employees container mt-5">
        <h1>Employee List</h1>
        {
          this.props.employees.map(employee =>
            <div key={employee.id}>
              <h4>{employee.name}</h4>
            </div>
          )
        }
      </section>
    )
  }
}

export default EmployeeList