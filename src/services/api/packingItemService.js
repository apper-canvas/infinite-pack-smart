import packingItemData from '../mockData/packingItem.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PackingItemService {
  async getAll() {
    await delay(300)
    return [...packingItemData]
  }

  async getById(id) {
    await delay(250)
    const item = packingItemData.find(item => item.id === id)
    if (!item) {
      throw new Error('Packing item not found')
    }
    return { ...item }
  }

  async create(packingItem) {
    await delay(400)
    const newItem = {
      ...packingItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    packingItemData.push(newItem)
    return { ...newItem }
  }

  async update(id, data) {
    await delay(300)
    const index = packingItemData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Packing item not found')
    }
    
    packingItemData[index] = { ...packingItemData[index], ...data, updatedAt: new Date().toISOString() }
    return { ...packingItemData[index] }
  }

  async delete(id) {
    await delay(250)
    const index = packingItemData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Packing item not found')
    }
    
    const deletedItem = packingItemData.splice(index, 1)[0]
    return { ...deletedItem }
  }
}

export default new PackingItemService()