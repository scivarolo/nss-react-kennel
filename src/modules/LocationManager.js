const remoteURL = "http://localhost:5002/locations"

const LocationManager = {
  get(id) {
    return fetch(`${remoteURL}/${id}`).then(location => location.json())
  },
  getAll() {
    return fetch(remoteURL).then(locations => locations.json())
  }
}

export default LocationManager