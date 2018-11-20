import APIManager from "./APIManager";

class LocationManager extends APIManager {
  constructor() {
    super()
    this.resource = "locations"
  }
}

export default new LocationManager()