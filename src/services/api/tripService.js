import tripData from '../mockData/trip.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TripService {
  async getAll() {
    await delay(300)
    return [...tripData]
  }

  async getById(id) {
    await delay(250)
    const trip = tripData.find(trip => trip.id === id)
    if (!trip) {
      throw new Error('Trip not found')
    }
    return { ...trip }
  }

  async create(tripItem) {
    await delay(400)
    const newTrip = {
      ...tripItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    tripData.push(newTrip)
    return { ...newTrip }
  }

  async update(id, data) {
    await delay(300)
    const index = tripData.findIndex(trip => trip.id === id)
    if (index === -1) {
      throw new Error('Trip not found')
    }
    
    tripData[index] = { ...tripData[index], ...data, updatedAt: new Date().toISOString() }
    return { ...tripData[index] }
  }

  async delete(id) {
    await delay(250)
    const index = tripData.findIndex(trip => trip.id === id)
    if (index === -1) {
      throw new Error('Trip not found')
    }
    
    const deletedTrip = tripData.splice(index, 1)[0]
    return { ...deletedTrip }
  }
}

export default new TripService()