import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class OwnerList extends Component {
  render() {
    return (
      <section className="owners container mt-5">
        <h1 className="mb-4">Owners List</h1>
        <div className="card-columns">
        {
          this.props.owners.map(owner => {
            return (
              <div key={owner.id} className="card mb-3">
                <div className="card-body">
                  <h4 className="card-title">{owner.name}</h4>
                  <p className="card-subtitle mb-3">{owner.phone}</p>
                  <Link className="btn btn-sm btn-info mr-1" to={`/owners/${owner.id}`}>Details</Link>
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.deleteOwner(owner.id)}>Delete</button>
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

export default OwnerList
