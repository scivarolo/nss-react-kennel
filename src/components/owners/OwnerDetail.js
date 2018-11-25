import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class OwnerDetail extends Component {

  render() {
    const owner = this.props.owners.find(owner => owner.id === parseInt(this.props.match.params.ownerId))

    return (
      <section className="employee container">
        <div key={owner.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {owner.name}
            </h4>
            <Link className="card-link" to="/animals" onClick={() => this.props.deleteOwner(owner.id)}>Delete</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default OwnerDetail