import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AnimalCard from '../animals/AnimalCard'

class EmployeeDetail extends Component {

  render() {
    const employee = this.props.employees.find(employee => employee.id === parseInt(this.props.match.params.employeeId))
    const animals = this.props.animals.filter(animal => animal.employeeId === employee.id)
    return (
      <section className="employee container">
        <div key={employee.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {employee.name}
            </h4>
            <h6>Responsible for:</h6>

            { animals.length > 0
              ? (
                  <div className="card-columns">
                  {
                    animals.map(animal => {
                    return <AnimalCard key={animal.id} animal={animal} {...this.props} /> })
                  }
                  </div>
              )
              : (<p>Not caring for any animals</p>)
            }
            <Link className="card-link" to="/animals" onClick={() => this.props.fireEmployee(employee.id)}>Delete</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default EmployeeDetail