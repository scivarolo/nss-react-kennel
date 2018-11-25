import APIManager from "./APIManager"

// const remoteURL = "http://localhost:5002/animals"

class AnimalManager extends APIManager {

  constructor() {
    super()
    this.resource = "animals"
  }

  deleteAndList(id) {
    let info
    let newState = {}
    //find animal in animalsOwners and store in info
    return fetch(`${this.urls.animalOwners}?animalId=${id}`)
    .then(r => r.json())
    .then(r => info = r)
    //delete animal. json-server also automatically deletes their entry in animalOwners
    .then(() => fetch(`${this.urls[this.resource]}/${info[0].animalId}`, {
        method: "DELETE"
      })
    )
    //delete owners
    .then(() => {
      let promises = []
      info.forEach(relationship => {
        promises.push(
          fetch(`${this.urls.owners}/${relationship.ownerId}`, {method: "DELETE"})
        )
      })
      return Promise.all(promises)
    })
    //get new data to update state and return it
    .then(() => fetch(`${this.urls[this.resource]}`)
      .then(r => r.json())
      .then(animals => newState.animals = animals)
    .then(() => fetch(this.urls.owners))
      .then(r => r.json())
      .then(owners => newState.owners = owners)
    .then(() => fetch(this.urls.animalOwners))
      .then(r => r.json())
      .then(animalOwners => newState.animalOwners = animalOwners))
      .then(() => newState)

  }

  post(newAnimal) {
    return fetch(`${this.urls.animals}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAnimal)
    }).then(data => data.json())
  }

}

export default new AnimalManager()