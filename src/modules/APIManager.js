class APIManager {
  constructor() {
    this.baseURL = "http://localhost:5002"
    this.resource = "animals"
    this.urls = {
      animals: `${this.baseURL}/animals`,
      locations: `${this.baseURL}/locations`,
      employees: `${this.baseURL}/employees`,
      owners: `${this.baseURL}/owners`,
      animalOwners: `${this.baseURL}/animalOwners`
    }
  }

  get(id) {
    return fetch(`${this.urls[this.resource]}/${id}`).then(r => r.json())
  }

  getAll() {
    return fetch(`${this.urls[this.resource]}`).then(r => r.json())
  }

  query(queryString) {
    return fetch(`${this.urls[this.resource]}?q=${queryString}`)
    .then(r => r.json())
  }
  deleteAndList(id) {
    return fetch(`${this.urls[this.resource]}/${id}`, {
      method: "DELETE"
    })
    .then(() => this.getAll())
  }
}

export default APIManager