import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AnimalCard from './AnimalCard'

class AnimalList extends Component {

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
            return <AnimalCard key={animal.id} animal={animal} {...this.props} />
          })
        }
        </div>

      </section>
    )
  }
}

export default AnimalList