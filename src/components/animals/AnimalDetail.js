import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AnimalDetail extends Component {

  render() {
    const animal = this.props.animals.find(animal => animal.id === parseInt(this.props.match.params.animalId))

    return (
      <section className="animal container">
        <div key={animal.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {animal.name}
            </h4>
            <h6>{animal.breed}</h6>
            <Link className="card-link" to="/animals" onClick={() => this.props.deleteAnimal(animal.id)}>Delete</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default AnimalDetail