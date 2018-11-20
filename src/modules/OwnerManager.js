import APIManager from "./APIManager";

class OwnerManager extends APIManager {

  constructor() {
    super()
    this.resource = "owners"
  }

  deleteAndList(id) {
    let info
    let newState = {}
    //find owner in animalsOwners and store in info
    return fetch(`${this.urls.animalOwners}?ownerId=${id}`)
    .then(r => r.json())
    .then(r => info = r)
    //delete owner. json-server also automatically deletes their entry in animalOwners
    .then(() => fetch(`${this.urls[this.resource]}/${info[0].ownerId}`, {
        method: "DELETE"
      })
    )
    //check if animalId is still in animalOwners (aka a second owner)
    .then(() => fetch(`${this.urls.animalOwners}?animalId=${info[0].animalId}`))
    .then(r => r.json())
    .then(r => {
      if (r.length ===  0) {
        return fetch(`${this.urls.animals}/${info[0].animalId}`, {
          method: "DELETE"
        })
      }
    })
    //get new data to update state and return it
    .then(() => fetch(`${this.urls[this.resource]}`)
      .then(r => r.json())
      .then(owners => newState.owners = owners)
    .then(() => fetch(this.urls.animals))
      .then(r => r.json())
      .then(animals => newState.animals = animals)
    .then(() => fetch(this.urls.animalOwners))
      .then(r => r.json())
      .then(animalOwners => newState.animalOwners = animalOwners))
      .then(() => newState)

  }
}

export default new OwnerManager()