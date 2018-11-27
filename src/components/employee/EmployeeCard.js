import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class EmployeeCard extends Component {
  state = {  }
  render() {
    const employee = this.props.employee
    return (
      <div key={employee.id} className="card mb-3">
        <div className="card-body">
          <h4 className="card-title">{employee.name}</h4>
          <Link className="btn btn-sm btn-info mr-1" to={`/employees/${employee.id}`}>Details</Link>
          <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.fireEmployee(employee.id)}>Fire</button>
        </div>
      </div>
     );
  }
}

export default EmployeeCard;