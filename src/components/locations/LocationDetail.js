import React, { Component } from 'react'
import EmployeeCard from '../employee/EmployeeCard';

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
            <div className="card-columns">
              {
                this.props.employees.filter(employee => employee.locationId === location.id)
                .map(employee => {
                  return <EmployeeCard key={employee.id} employee={employee} {...this.props} />
                })
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LocationDetail