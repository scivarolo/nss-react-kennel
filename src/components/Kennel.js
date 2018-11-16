import React, { Component } from 'react'
import EmployeeList from './employee/EmployeeList'
import LocationList from './locations/LocationList'

class Kennel extends Component {
  render() {
    return (
      <div>
        <h1>Student Kennels</h1>
        <LocationList />
        <EmployeeList />
      </div>
    );
  }
}

export default Kennel
