import React, { Component } from 'react'

class AnimalForm extends Component {

  state = {
    animalName: "",
    type: "",
    employee: "",
    owners: []
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

  constructNewAnimal = e => {
    e.preventDefault()
    if (this.state.employee === "") {
      window.alert("Please select a caretaker")
    } else {
      const animal = {
        name: this.state.animalName,
        type: this.state.type,
        employeeId: this.props.employees.find(e => e.name === this.state.employee).id
      }
      const owners = this.state.owners

      this.props.addAnimal(animal, owners)
      .then(() => this.props.history.push("/animals"))
    }
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h2>Admit an Animal</h2>
        </div>
        <form className="animalForm">
          <div className="form-group">
            <label htmlFor="animalname">Animal Name</label>
            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="animalName" placeholder="Animal Name" />
          </div>
          <div className="row">

            <div className="form-group col-md-6">
              <label htmlFor="owners">{`Owner(s)`}</label>
              <select className="form-control" defaultValue={[]} name="owners" id="owners" onChange={this.handleFieldChange} size="6" multiple>
                {
                  this.props.owners.map(o => <option key={o.id} id={o.id}>{o.name}</option>)
                }
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="type">Animal Type</label>
                <input type="text" required className="form-control" onChange={this.handleFieldChange} id="type" placeholder="Type" />
              </div>
              <div className="form-group">
                <label htmlFor="employee">Assign to Caretaker</label>
                <select className="form-control" defaultValue="" name="employee" id="employee" onChange={this.handleFieldChange}>
                  <option value="">Select an employee</option>
                  {
                    this.props.employees.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
                  }
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.constructNewAnimal}>Admit Animal</button>
        </form>
      </div>
    )
  }
}

export default AnimalForm