const remoteURL = "http://localhost:5002/animals"

const AnimalManager = {
  get(id) {
    return fetch(`${remoteURL}/${id}`).then(animal => animal.json())
  },
  getAll() {
    return fetch(remoteURL).then(animals => animals.json())
  }
}

export default AnimalManager