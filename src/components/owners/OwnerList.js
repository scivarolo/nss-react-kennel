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
              <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.deleteOwner(owner.id)}>Delete</button>
            </div>
          )
        }
      </section>
    )
  }
}

export default OwnerList
