import React, { Component } from 'react';

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
      <article>
        <h1>Animal List</h1>
        {
          this.props.animals.map(animal => {
            return <div key={animal.id}>
              <h4>{animal.name}</h4>
              <p>Owners: {this.ownedBy(animal.id)}</p>
            </div>
          })
        }

      </article>
    )
  }
}

export default AnimalList