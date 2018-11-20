import APIManager from "./APIManager"

class EmployeeManager extends APIManager {

  constructor() {
    super()
    this.resource = "employees"
  }

}

export default new EmployeeManager()