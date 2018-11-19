import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalOwners: []
  }

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/animals`))
    .then(r => r.json())
    .then(animals => this.setState({
        animals: animals
      })
    )
  }

  componentDidMount() {
    const newState = {}
    const baseUrl = "http://localhost:5002/"

    fetch(`${baseUrl}locations`)
      .then(r => r.json())
      .then(locations => newState.locations = locations)
      .then(() => fetch(`${baseUrl}animals`))
        .then(r => r.json())
        .then(animals => newState.animals = animals)
      .then(() => fetch(`${baseUrl}employees`))
        .then(r => r.json())
        .then(employees => newState.employees = employees)
      .then(() => fetch(`${baseUrl}owners`))
        .then(r => r.json())
        .then(owners => newState.owners = owners)
      .then(() => fetch(`${baseUrl}animalOwners`))
        .then(r => r.json())
        .then(animalOwners => newState.animalOwners = animalOwners)
      .then(() => this.setState(newState))
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={() => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route path="/animals" render={() => {
          return <AnimalList
            animals={this.state.animals}
            owners={this.state.owners}
            animalOwners={this.state.animalOwners}
            deleteAnimal={this.deleteAnimal} />
        }} />
        <Route path="/employees" render={() => {
          return <EmployeeList employees={this.state.employees} />
        }} />
        <Route path="/owners" render={() => {
          return <OwnerList owners={this.state.owners} />
        }} />
      </React.Fragment>
    )
  }

}

export default ApplicationViews