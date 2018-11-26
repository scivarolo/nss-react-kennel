import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class AnimalList extends Component {

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
    return (
      <section className="animals container mt-5">
        <div className="row">
          <div className="col-md-10">
            <h1 className="mb-4">Animal List</h1>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary float-right" to="/animals/new">Admit Animal</Link>
          </div>
        </div>
        <div className="card-columns">
        {
          this.props.animals.map(animal => {
            return (

              <div key={animal.id} className="card">
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
          })
        }
        </div>

      </section>
    )
  }
}

export default AnimalList