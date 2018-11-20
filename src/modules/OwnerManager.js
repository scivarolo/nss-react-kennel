const remoteURL = "http://localhost:5002/owners"

const OwnerManager = {
  get(id) {
    return fetch(`${remoteURL}/${id}`).then(owner => owner.json())
  },
  getAll() {
    return fetch(remoteURL).then(owners => owners.json())
  },
  deleteAndList(id) {
    let info
    let newState = {}
    //find owner in animalsOwners and store in info
    return fetch(`http://localhost:5002/animalOwners?ownerId=${id}`)
    .then(r => r.json())
    .then(r => info = r)
    //delete owner. json-server also automatically deletes their entry in animalOwners
    .then(() => fetch(`${remoteURL}/${info[0].ownerId}`, {
        method: "DELETE"
      })
    )
    //check if animalId is still in animalOwners (aka a second owner)
    .then(() => fetch(`http://localhost:5002/animalOwners?animalId=${info[0].animalId}`))
    .then(r => r.json())
    .then(r => {
      if (r.length ===  0) {
        return fetch(`http://localhost:5002/animals/${info[0].animalId}`, {
          method: "DELETE"
        })
      }
    })
    //get new data to update state and return it
    .then(() => fetch(`http://localhost:5002/owners`)
      .then(r => r.json())
      .then(owners => newState.owners = owners)
    .then(() => fetch(`http://localhost:5002/animals`))
      .then(r => r.json())
      .then(animals => newState.animals = animals)
    .then(() => fetch(`http://localhost:5002/animalOwners`))
      .then(r => r.json())
      .then(animalOwners => newState.animalOwners = animalOwners))
      .then(() => newState)

  }
}

export default OwnerManager