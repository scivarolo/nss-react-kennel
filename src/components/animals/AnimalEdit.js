import React, { Component } from 'react'

class EditAnimal extends Component {
  state = {
    animalName: "",
    type: "",
    employee: "",
    owners: [],
  }

  handleFieldChange = e => {
    const stateChange = {}
    if (e.target.id === "owners") {
      let owners = []
      for( let i = 0; i < e.target.options.length; i++) {
        if(e.target.options[i].selected) {
          owners.push(Number(e.target.options[i].id))
        }
      }
      stateChange[e.target.id] = owners
    } else {
      stateChange[e.target.id] = e.target.value
    }
    this.setState(stateChange)
  }

  componentDidMount() {
    // store the existing values in state to start
    let newState = {}
    let animal = this.props.animals.find(animal => animal.id === parseInt(this.props.match.params.animalId))
    newState.animalName = animal.name
    newState.type = animal.type
    newState.employee = animal.employeeId
    let owners = this.props.animalOwners
      .filter(relation => relation.animalId === animal.id)
      .map(join => this.props.owners.find(owner => owner.id === join.ownerId))

    newState.owners = owners.map(owner => owner.id)

    this.setState(newState)
  }

  constructEditedAnimal = e => {
    // prepare objects for editing database
    e.preventDefault()
    const animal = {
      name: this.state.animalName,
      type: this.state.type,
      employeeId: parseInt(this.state.employee),
      id: this.props.match.params.animalId
    }
    const owners = this.state.owners
    console.log("animal", animal)
    return this.props.editAnimal(animal, owners)
    .then(() => this.props.history.push("/animals"))
  }

  render() {

    return (
      <div className="container">
        <form className="editAnimalForm">
          <div className="form-group">
            <label htmlFor="animalName">Change Animal Name</label>
            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="animalName" value={this.state.animalName}/>
          </div>
          <div className="row">

            <div className="form-group col-md-6">
              <label htmlFor="owners">{`Change Owner(s)`}</label>
              <select className="form-control" defaultValue={[]} name="owners" id="owners" onChange={this.handleFieldChange} size="6" multiple>
                {
                  // Pre-select the current owners
                  this.props.owners.map((o, i) => {
                    if(this.state.owners.find(owner => owner === o.id )) {
                      return <option selected key={o.id} id={o.id}>{o.name}</option>
                    }
                    return <option key={o.id} id={o.id}>{o.name}</option>
                  })
                }
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="type">Change Animal Type</label>
                <input type="text" required className="form-control" onChange={this.handleFieldChange} id="type" placeholder="Type" value={this.state.type} />
              </div>
              <div className="form-group">
                <label htmlFor="employee">Change Caretaker</label>
                <select className="form-control" name="employee" id="employee" onChange={this.handleFieldChange}>
                  <option value="">Select an employee</option>
                  {
                  // Pre-select the current employee
                  this.props.employees.map(e => {
                    if(this.state.employee === e.id) {
                      return <option selected key={e.id} id={e.id} value={e.id}>{e.name}</option>
                    }
                    return <option key={e.id} id={e.id} value={e.id}>{e.name}</option>
                  })
                  }
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" onClick={this.constructEditedAnimal}>Edit Animal</button>

        </form>
      </div>
    );
  }
}

export default EditAnimal