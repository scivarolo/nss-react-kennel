import { Switch, Route, Redirect } from 'react-router-dom'
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
import EditAnimal from './animals/AnimalEdit'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owners/OwnerForm';

import Login from './authentication/Login'

import SearchResults from './search/SearchResults'

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalOwners: []
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") || localStorage.getItem("credentials") !== null

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

  deleteAnimal = id => {
    return AnimalManager.deleteAndList(id)
      .then(newState => this.setState(newState))
  }

  addAnimal = (animal, owners) => {
    let newState = {}

    return AnimalManager.post(animal)
      .then(newAnimal => {
        // for each owner, add an entry to animalOwners with ownerId and newAnimal.id
        let ownerPromises = []
        owners.forEach(owner => {
          let object = {
            animalId: newAnimal.id,
            ownerId: owner
          }
          ownerPromises.push(AnimalManager.linkOwnerAndAnimal(object))
        })
        return Promise.all(ownerPromises)
      })
      .then(() => AnimalManager.getAll())
      .then(animals => newState.animals = animals)
      .then(() => AnimalManager.getAnimalOwners())
      .then(animalOwners => newState.animalOwners = animalOwners)
      .then(() => this.setState(newState))
  }

  editAnimal = (animal, newOwnerIds) => {
    let newState = {}

    return AnimalManager.edit(animal)
      .then(updated => {
        let animalId = updated.id
        let ownerPromises = []

        let currentOwners = this.state.animalOwners.filter(rel => rel.animalId === animalId)

        // remove current owners
        currentOwners.forEach(ownerRel => {
          ownerPromises.push(AnimalManager.deleteOwnerRel(ownerRel.id))
        })

        // add new owners
        newOwnerIds.forEach(newOwnerId => {
          let object = {
            animalId: parseInt(animalId),
            ownerId: parseInt(newOwnerId)
          }
          ownerPromises.push(AnimalManager.linkOwnerAndAnimal(object))
        })
        return Promise.all(ownerPromises)
      })
      .then(() => AnimalManager.getAll())
      .then(animals => newState.animals = animals)
      .then(() => AnimalManager.getAnimalOwners())
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

  render() {
    return (
      <Switch>

        <Route path="/login" component={Login} />

        <Route exact path="/" render={() => {
          if (this.isAuthenticated()) {
            return <LocationList locations={this.state.locations} />
          }
          return <Redirect to="/login" />
        }} />


        <Route
          path="/locations/:locationId(\d+)"
          render={props => {
            return <LocationDetail {...props} locations={this.state.locations} employees={this.state.employees} />
          }} />

        <Route exact path="/animals" render={() => {
          if (this.isAuthenticated()) {
            return <AnimalList
              animals={this.state.animals}
              owners={this.state.owners}
              animalOwners={this.state.animalOwners}
              deleteAnimal={this.deleteAnimal} />
          }
          return <Redirect to="/login" />
        }} />

        <Route exact path="/animals/new" render={props => {
          return <AnimalForm {...props}
            addAnimal={this.addAnimal}
            owners={this.state.owners}
            employees={this.state.employees} />
        }} />

        <Route path="/animals/edit/:animalId(\d+)"
          render={props => {
            return <EditAnimal {...props}
              animals={this.state.animals}
              owners={this.state.owners}
              employees={this.state.employees}
              animalOwners={this.state.animalOwners}
              editAnimal={this.editAnimal} />
          }} />

        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            return <AnimalDetail {...props}
              deleteAnimal={this.deleteAnimal}
              animals={this.state.animals}
              owners={this.state.owners}
              employees={this.state.employees} animalOwners={this.state.animalOwners} />
          }} />

        <Route exact path="/employees" render={() => {
          if(this.isAuthenticated()) {
            return <EmployeeList
            employees={this.state.employees}
            fireEmployee={this.fireEmployee} />
          }
          return <Redirect to="/login" />
        }} />

        <Route path="/employees/new" render={props => {
          return <EmployeeForm {...props}
            addEmployee={this.addEmployee} />
        }} />

        <Route path="/employees/:employeeId(\d+)" render={props => {
          return <EmployeeDetail { ...props }
            employees={this.state.employees}
            animals={this.state.animals}
            owners={this.state.owners}
            animalOwners={this.state.animalOwners}
            fireEmployee={this.fireEmployee} />
        }} />

        <Route exact path="/owners" render={() => {
          if (this.isAuthenticated()) {
            return <OwnerList
              owners={this.state.owners}
              deleteOwner={this.deleteOwner} />
          }
          return <Redirect to="/login" />
        }} />

        <Route path="/owners/new" render={ props => {
          return <OwnerForm {...props}
            addOwner={this.addOwner} />
        }} />

        <Route path="/owners/:ownerId(\d+)" render={props => {
          return <OwnerDetail { ...props }
          owners={this.state.owners}
          animals={this.state.animals}
          animalOwners={this.state.animalOwners}
          deleteOwner={this.deleteOwner} />
        }} />

        <Route exact path="/results" render={() => {
          if(this.isAuthenticated()) {
            return <SearchResults
              results={this.props.searchResults} />
          }
          return <Redirect to="/login" />
        }} />
      </Switch>
    )
  }

}

export default ApplicationViews