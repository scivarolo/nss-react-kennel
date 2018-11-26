import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class OwnerDetail extends Component {

  render() {
    const owner = this.props.owners.find(owner => owner.id === parseInt(this.props.match.params.ownerId))
    const animals = this.props.animalOwners
      .filter(relation => relation.ownerId === owner.id)
      .map(join => this.props.animals.find(animal => animal.id === join.animalId))

    return (
      <section className="employee container">
        <div key={owner.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {owner.name}
            </h4>
            <h6>{owner.phone}</h6>
            <h6>Admitted Animals</h6>
            {
              animals.length > 0
                ? (
                  <ul>
                    {
                      animals.map(animal => {
                        return <li key={animal.id}>
                          <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
                        </li>
                      })
                    }
                  </ul>
                )
                : (<p>No admitted animals</p>)

            }
            <Link className="card-link" to="/animals" onClick={() => this.props.deleteOwner(owner.id)}>Delete</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default OwnerDetail