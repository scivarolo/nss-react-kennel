import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LocationDetail extends Component {

  render() {
    const location = this.props.locations.find(location => location.id === parseInt(this.props.match.params.locationId))

    return (
      <section className="location container">
        <div key={location.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {location.name}
            </h4>
            <p>{location.address}</p>
            {/* <Link className="card-link" to="/animals" onClick={() => this.props.firelocation(location.id)}>Delete</Link> */}
          </div>
        </div>
      </section>
    )
  }
}

export default LocationDetail