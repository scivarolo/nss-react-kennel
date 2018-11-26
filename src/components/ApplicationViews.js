import { Switch, Route } from 'react-router-dom'
import React, { Component } from "react"

import AnimalManager from '../modules/AnimalManager'
import EmployeeManager from '../modules/EmployeeManager'
import LocationManager from '../modules/LocationManager'
import OwnerManager from '../modules/OwnerManager'

import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'

import LocationDetail from './locations/LocationDetail'
import AnimalDetail from './animals/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerDetail from './owners/OwnerDetail'

import AnimalForm from './animals/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'

import SearchResults from './search/SearchResults'
import OwnerForm from './owners/OwnerForm';

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

  addAnimal = (animal, owners) => {

    let newState = {}
    const baseUrl = "http://localhost:5002/"

    return AnimalManager.post(animal)
      .then(newAnimal => {
        // for each owner, add an entry to animalOwners with ownerId and newAnimal.id
        let ownerPromises = []
        owners.forEach(owner => {
          let object = {
            animalId: newAnimal.id,
            ownerId: owner
          }
          return AnimalManager.linkOwnerAndAnimal(object)
        })
        return Promise.all(ownerPromises)
      })
      .then(() => AnimalManager.getAll())
      .then(animals => newState.animals = animals)
      .then(() => fetch(`${baseUrl}animalOwners`))
      .then(r => r.json())
      .then(animalOwners => newState.animalOwners = animalOwners)
      .then(() => this.setState(newState))
  }

  addOwner = owner => {
    return OwnerManager.post(owner)
      .then(() => OwnerManager.getAll())
      .then(owners => this.setState({
        owners: owners
      })
    )
  }

  deleteOwner = id => {
    return OwnerManager.deleteAndList(id)
    .then(newState => this.setState(newState))
  }

  addEmployee = employee => {
    return EmployeeManager.post(employee)
      .then(() => EmployeeManager.getAll())
      .then(employees => this.setState({
        employees: employees
      })
    )
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
      <Switch>
        <Route exact path="/" render={() => {
          return <LocationList locations={this.state.locations} />
        }} />

        <Route
          path="/locations/:locationId(\d+)"
          render={props => {
            return <LocationDetail {...props} locations={this.state.locations} />
          }} />

        <Route exact path="/animals" render={() => {
          return <AnimalList
            animals={this.state.animals}
            owners={this.state.owners}
            animalOwners={this.state.animalOwners}
            deleteAnimal={this.deleteAnimal} />
        }} />

        <Route path="/animals/new" render={props => {
          return <AnimalForm {...props}
            addAnimal={this.addAnimal}
            owners={this.state.owners}
            employees={this.state.employees} />
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

        <Route path="/employees/new" render={props => {
          return <EmployeeForm {...props}
            addEmployee={this.addEmployee} />
        }} />

        <Route path="/employees/:employeeId(\d+)" render={props => {
          return <EmployeeDetail { ...props }
            employees={this.state.employees}
            fireEmployee={this.fireEmployee} />
        }} />

        <Route exact path="/owners" render={() => {
          return <OwnerList
            owners={this.state.owners}
            deleteOwner={this.deleteOwner} />
        }} />

        <Route path="/owners/new" render={ props => {
          return <OwnerForm {...props}
            addOwner={this.addOwner} />
        }} />

        <Route path="/owners/:ownerId(\d+)" render={props => {
          return <OwnerDetail { ...props }
          owners={this.state.owners}
          deleteOwner={this.deleteOwner} />
        }} />

        <Route exact path="/results" render={() => {
          return <SearchResults
            results={this.props.searchResults} />
        }} />
      </Switch>
    )
  }

}

export default ApplicationViews