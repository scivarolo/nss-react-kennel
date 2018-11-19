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

  deleteOwner = id => {
    let info = []
    let newState = []
    //find owner in animalsOwners and store in animalInfo
    return fetch(`http://localhost:5002/animalOwners/${id}`)
    .then(r => r.json())
    .then(r => info.push(r))
    //delete owner item
    .then(() => fetch(`http://localhost:5002/owners/${info[0].ownerId}`, {
      method: "DELETE"
    }))
    //check if animalId is still present in animalOwners (aka there's a second owner)
    .then(() => fetch(`http://localhost:5002/animalOwners?animalId=${info[0].animalId}`))
    .then(r => r.json())
    //delete animal if there is no other owner
    .then(r => {
      if(r.length === 0) {
        return fetch(`http://localhost:5002/animals/${info[0].animalId}`,{
          method: "DELETE"
        })
      }
    })

    //update state for all 3 tables
    .then(() => fetch(`http://localhost:5002/owners`)
      .then(r => r.json())
      .then(owners => newState.owners = owners)
    .then(() => fetch(`http://localhost:5002/animals`))
      .then(r => r.json())
      .then(animals => newState.animals = animals)
    .then(() => fetch(`http://localhost:5002/animalOwners`))
      .then(r => r.json())
      .then(animalOwners => newState.animalOwners = animalOwners))
    .then(() => this.setState(newState))

  }

  fireEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
    .then(() => fetch(`http://localhost:5002/employees`))
    .then(r => r.json())
    .then(employees => this.setState({
        employees: employees
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
          return <EmployeeList
            employees={this.state.employees}
            fireEmployee={this.fireEmployee} />
        }} />
        <Route path="/owners" render={() => {
          return <OwnerList
            owners={this.state.owners}
            deleteOwner={this.deleteOwner} />
        }} />
      </React.Fragment>
    )
  }

}

export default ApplicationViews