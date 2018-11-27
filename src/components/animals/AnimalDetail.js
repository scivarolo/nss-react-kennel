import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AnimalDetail extends Component {

  state = {
    currentId: "",
    animal: "",
    owners: [],
    employee: ""
  }

  componentDidMount() {
    const newState = {}

    newState.currentId = parseInt(this.props.match.params.animalId)
    newState.animal = this.props.animals.find(animal => animal.id === newState.currentId)
    newState.owners = this.props.animalOwners.filter(relation => relation.animalId === newState.currentId).map(join => this.props.owners.find(owner => owner.id === join.ownerId))
    newState.employee = this.props.employees.find(employee => employee.id === newState.animal.employeeId)
    this.setState(newState)

  }

  render() {
    return (
      <section className="animal container">
        <div key={this.state.animal.id} className="card">
          <div className="card-header">
            {this.state.animal.type}
          </div>
          <div className="card-body">
            <h4 className="card-title">
              {this.state.animal.name}
            </h4>
            <h6>{`Owner(s):`}</h6>
            <ul>
              {
                this.state.owners.map(owner => <li key={owner.id}><Link to={`/owners/${owner.id}`}>{owner.name}</Link></li>)
              }
            </ul>
            <h6>Caretaker:</h6>
            <p><Link to={`/employees/${this.state.employee.id}`}>{this.state.employee.name}</Link></p>
            <Link className="card-link" to="/animals" onClick={() => this.props.deleteAnimal(this.state.animal.id)}>Delete</Link>
            <Link className="card-link" to={`/animals/edit/${this.state.animal.id}`}>Edit</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default AnimalDetail