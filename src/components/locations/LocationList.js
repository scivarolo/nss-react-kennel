import React, { Component } from 'react';

class LocationList extends Component {
  render() {
    return (
      <section className="container mt-5">
        <h1>Location List</h1>
        {
          this.props.locations.map(location => {
            return <div key={location.id}>
              <h4>{location.name}</h4>
              <p>{location.address}</p>
            </div>
          })
        }
      </section>
    )
  }
}

export default LocationList

