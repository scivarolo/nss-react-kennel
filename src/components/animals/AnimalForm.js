import React, { Component } from 'react'

class AnimalForm extends Component {

  state = {
    animalName: "",
    type: "",
    employee: ""
  }

  handleFieldChange = e => {
    const stateChange = {}
    stateChange[e.target.id] = e.target.value
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

      this.props.addAnimal(animal)
      .then(() => this.props.history.push("/animals"))
    }
  }

  render() {
    return (
      <div className="container">
        <form className="animalForm">
          <div className="form-group">
            <label htmlFor="animalname">Animal Name</label>
            <input type="text" required="true" className="form-control" onChange={this.handleFieldChange} id="animalName" placeholder="Animal Name" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Breed</label>
            <input type="text" required="true" className="form-control" onChange={this.handleFieldChange} id="type" placeholder="Type" />
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
          <button type="submi" className="btn btn-primary" onClick={this.constructNewAnimal}>Admit Animal</button>
        </form>
      </div>
    )
  }
}

export default AnimalForm