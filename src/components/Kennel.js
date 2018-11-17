import React, { Component } from 'react'
import EmployeeList from './employee/EmployeeList'
import LocationList from './locations/LocationList'
import "./kennel.css"
import AnimalList from './animals/AnimalList';

class Kennel extends Component {
  /*
    Although you will eventually be pulling your objects from your json-server API, for this chapter, we're faking it and just creating those arrays in the component itself
  */
  employeesFromAPI = [
    { id: 1, name: "Jessica Younker" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
  ]

  // This will eventually get pulled from the API
  // TODO: Pull from API
  locationsFromAPI = [
    { id: 1, name: "Nashville North", address: "500 Circle Way" },
    { id: 2, name: "Nashville South", address: "10101 Binary Court" }
  ]

  animalsFromAPI = [
    { id: 1, name: "Mochi" },
    { id: 2, name: "Milhouse" },
    { id: 3, name: "Sawyer" },
    { id: 4, name: "Jack" },
    { id: 5, name: "Gwendolyn"}
  ]

  ownersFromAPI = [
    { id: 1, name: "Kevin Corn" },
    { id: 2, name: "Sebastian Civarolo" },
    { id: 3, name: "Samantha Merritt" },
    { id: 4, name: "Clint Hime" },
    { id: 5, name: "Mary Hime" },
    { id: 6, name: "Alyssa Nelson" },
    { id: 7, name: "Steven Alves" }
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
      <div>
        <h1>Student Kennels</h1>
        <LocationList locations={this.state.locations} />
        <EmployeeList employees={this.state.employees} />
        <AnimalList animals={this.state.animals} owners={this.state.owners} animalOwners={this.state.animalOwners} />
      </div>
    );
  }
}

export default Kennel
