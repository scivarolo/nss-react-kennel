import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'

class ApplicationViews extends Component {
  // TODO: Pull from API
  employeesFromAPI = [
    { id: 1, name: "Jessica Younker" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
  ]

  locationsFromAPI = [
    { id: 1, name: "Nashville North", address: "500 Circle Way" },
    { id: 2, name: "Nashville South", address: "10101 Binary Court" }
  ]

  animalsFromAPI = [
    { id: 1, name: "Mochi" },
    { id: 2, name: "Milhouse" },
    { id: 3, name: "Sawyer" },
    { id: 4, name: "Jack" },
    { id: 5, name: "Gwendolyn" }
  ]

  ownersFromAPI = [
    { id: 1, name: "Kevin Corn", phone: "123-456-7890" },
    { id: 2, name: "Sebastian Civarolo", phone: "234-567-8901"},
    { id: 3, name: "Samantha Merritt", phone: "345-678-9012" },
    { id: 4, name: "Clint Hime", phone: "456-789-0123" },
    { id: 5, name: "Mary Hime", phone: "567-890-1234" },
    { id: 6, name: "Alyssa Nelson", phone: "678-901-2345" },
    { id: 7, name: "Steven Alves", phone: "789-012-3456" }
  ]

  animalOwnersFromAPI = [
    { id: 1, animalId: 1, ownerId: 1 },
    { id: 2, animalId: 1, ownerId: 2 },
    { id: 3, animalId: 2, ownerId: 3 },
    { id: 4, animalId: 3, ownerId: 4 },
    { id: 5, animalId: 3, ownerId: 5 },
    { id: 6, animalId: 4, ownerId: 6 },
    { id: 7, animalId: 5, ownerId: 7 }
  ]

  state = {
    employees: this.employeesFromAPI,
    locations: this.locationsFromAPI,
    animals: this.animalsFromAPI,
    owners: this.ownersFromAPI,
    animalOwners: this.animalOwnersFromAPI
  }

  render() {
    return (

      // <div>
      //   <h1>Student Kennels</h1>
      //   <LocationList locations={this.state.locations} />
      //   <EmployeeList employees={this.state.employees} />
      //   <AnimalList animals={this.state.animals} owners={this.state.owners} animalOwners={this.state.animalOwners} />
      // </div>

      <React.Fragment>
        <Route exact path="/" render={() => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route path="/animals" render={() => {
          return <AnimalList animals={this.state.animals} owners={this.state.owners} animalOwners={this.state.animalOwners} />
        }} />
        <Route path="/employees" render={() => {
          return <EmployeeList employees={this.state.employees} />
        }} />
        <Route path="/owners" render= {() => {
          return <OwnerList owners={this.state.owners} />
        }} />
      </React.Fragment>
    )
  }

}

export default ApplicationViews