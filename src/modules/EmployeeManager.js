const remoteURL = "http://localhost:5002/employees"

const EmployeeManager = {
  get(id) {
    return fetch(`${remoteURL}/${id}`).then(employee => employee.json())
  },
  getAll() {
    return fetch(remoteURL).then(employees => employees.json())
  }
}

export default EmployeeManager