import React, { Component } from 'react';

class LocationList extends Component {
  render() {
    return (
      <article>
        <h1>Location List</h1>
        {
          this.props.locations.map(location => {
            return <div key={location.id}>
              <h4>{location.name}</h4>
              <p>{location.address}</p>
            </div>
          })
        }
      </article>
    )
  }
}

export default LocationList

