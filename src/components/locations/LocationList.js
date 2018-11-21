import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class LocationList extends Component {
  render() {
    return (
      <section className="locations container mt-5">
        <h1 className="mb-4">Location List</h1>
        <div className="card-columns">
        {
          this.props.locations.map(location => {
            return (
              <div key={location.id} className="card">
                <div className="card-body">
                  <h4 className="card-title">{location.name}</h4>
                  <p className="card-subtitle mb-3">{location.address}</p>
                  <Link className="btn btn-sm btn-info mr-1" to={`/locations/${location.id}`}>Details</Link>
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

export default LocationList

