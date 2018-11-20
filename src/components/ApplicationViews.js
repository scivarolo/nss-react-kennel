import { Route } from 'react-router-dom'
import React, { Component } from "react"

import AnimalManager from '../modules/AnimalManager'
import EmployeeManager from '../modules/EmployeeManager'
import LocationManager from '../modules/LocationManager'
import OwnerManager from '../modules/OwnerManager'

import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'

import AnimalDetail from './animals/AnimalDetail'

import SearchResults from './search/SearchResults'

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalOwners: []
  }

  deleteAnimal = id => {
    return AnimalManager.deleteAndList(id)
      .then(newState => this.setState(newState))
  }

  deleteOwner = id => {
    return OwnerManager.deleteAndList(id)
    .then(newState => this.setState(newState))
  }

  fireEmployee = id => {
    return EmployeeManager.deleteAndList(id)
    .then(employees => this.setState({
      employees: employees
    }))
  }

  componentDidMount() {
    const newState = {}
    const baseUrl = "http://localhost:5002/"


    AnimalManager.getAll()
      .then(animals => newState.animals = animals)
    .then(() => LocationManager.getAll())
      .then(locations => newState.locations = locations)
    .then(() => EmployeeManager.getAll())
      .then(employees => newState.employees = employees)
    .then(() => OwnerManager.getAll())
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
        <Route exact path="/animals" render={() => {
          return <AnimalList
            animals={this.state.animals}
            owners={this.state.owners}
            animalOwners={this.state.animalOwners}
            deleteAnimal={this.deleteAnimal} />
        }} />

        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
          }} />

        <Route exact path="/employees" render={() => {
          return <EmployeeList
            employees={this.state.employees}
            fireEmployee={this.fireEmployee} />
        }} />
        <Route exact path="/owners" render={() => {
          return <OwnerList
            owners={this.state.owners}
            deleteOwner={this.deleteOwner} />
        }} />
        <Route exact path="/results" render={() => {
          return <SearchResults
            results={this.props.searchResults} />
        }} />
      </React.Fragment>
    )
  }

}

export default ApplicationViews