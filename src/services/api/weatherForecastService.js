import weatherForecastData from '../mockData/weatherForecast.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class WeatherForecastService {
  async getAll() {
    await delay(300)
    return [...weatherForecastData]
  }

  async getById(id) {
    await delay(250)
    const forecast = weatherForecastData.find(forecast => forecast.id === id)
    if (!forecast) {
      throw new Error('Weather forecast not found')
    }
    return { ...forecast }
  }

  async create(weatherForecast) {
    await delay(400)
    const newForecast = {
      ...weatherForecast,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    weatherForecastData.push(newForecast)
    return { ...newForecast }
  }

  async update(id, data) {
    await delay(300)
    const index = weatherForecastData.findIndex(forecast => forecast.id === id)
    if (index === -1) {
      throw new Error('Weather forecast not found')
    }
    
    weatherForecastData[index] = { ...weatherForecastData[index], ...data, updatedAt: new Date().toISOString() }
    return { ...weatherForecastData[index] }
  }

  async delete(id) {
    await delay(250)
    const index = weatherForecastData.findIndex(forecast => forecast.id === id)
    if (index === -1) {
      throw new Error('Weather forecast not found')
    }
    
    const deletedForecast = weatherForecastData.splice(index, 1)[0]
    return { ...deletedForecast }
  }
}

export default new WeatherForecastService()