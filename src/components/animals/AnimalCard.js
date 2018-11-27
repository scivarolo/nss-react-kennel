import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AnimalCard extends Component {
  state = {  }

  ownedBy(animalId) {
    return this.props.animalOwners
    // Find all owners of this animal in joiner table
      .filter(joiner => animalId === joiner.animalId)
    // With those results, get the owner objects from owners table
      .map(joiner => this.props.owners.find(owner => owner.id === joiner.ownerId))
    // get only the owners names
      .map(owner => owner.name)
    // join array into a list
      .join(", ")
  }

  render() {
    const animal = this.props.animal

    return (
      <div className="card">
        <div className="card-header">{animal.type}</div>
        <div className="card-body">
          <h4 className="card-title">{animal.name}</h4>
          <p className="card-subtitle mb-3">Owners: {this.ownedBy(animal.id)}</p>
          <Link className="btn btn-sm btn-info mr-1" to={`/animals/${animal.id}`}>Details</Link>
          <button type="button" className="btn btn-sm btn-danger"
            onClick = {() => this.props.deleteAnimal(animal.id)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default AnimalCard