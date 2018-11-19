const remoteURL = "http://localhost:5002/owners"

const OwnerManager = {
  get(id) {
    return fetch(`${remoteURL}/${id}`).then(owner => owner.json())
  },
  getAll() {
    return fetch(remoteURL).then(owners => owners.json())
  }
}

export default OwnerManager