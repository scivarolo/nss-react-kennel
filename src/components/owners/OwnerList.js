import React, { Component } from 'react';

class OwnerList extends Component {
  render() {
    return (
      <section className="owners container mt-5">
        <h1>Owners List</h1>
        {
          this.props.owners.map(owner =>
            <div key={owner.id}>
              <h4>{owner.name}</h4>
              <p>{owner.phone}</p>
            </div>
          )
        }
      </section>
    )
  }
}

export default OwnerList
