import AnimalManager from "./AnimalManager";
import LocationManager from "./LocationManager";
import EmployeeManager from "./EmployeeManager";

class Search {
  getResults(queryString) {
    const searchArray = [
      AnimalManager.query(queryString),
      LocationManager.query(queryString),
      EmployeeManager.query(queryString)
    ]
    return Promise.all(searchArray)
  }
}

export default new Search()