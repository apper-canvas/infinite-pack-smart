import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays } from 'date-fns'
import ApperIcon from './ApperIcon'
import tripService from '../services/api/tripService'
import packingItemService from '../services/api/packingItemService'
import weatherForecastService from '../services/api/weatherForecastService'

function MainFeature() {
  // Form States
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentStep, setCurrentStep] = useState('setup') // setup, weather, packing
  
  // Data States
  const [trip, setTrip] = useState(null)
  const [packingItems, setPackingItems] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [categories, setCategories] = useState([])
  const [customItem, setCustomItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Clothing')
  
  // UI States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAddItem, setShowAddItem] = useState(false)

  // Load initial data
  useEffect(() => {
    loadPackingCategories()
  }, [])

  const loadPackingCategories = () => {
    const defaultCategories = [
      'Clothing', 'Toiletries', 'Electronics', 'Documents', 
      'Shoes', 'Accessories', 'Medication', 'Entertainment'
    ]
    setCategories(defaultCategories)
  }

  const handleTripSetup = async (e) => {
    e.preventDefault()
    
    if (!destination || !startDate || !endDate) {
      toast.error("Please fill in all fields")
      return
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be after start date")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create trip
      const newTrip = await tripService.create({
        destination,
        startDate,
        endDate,
        weatherData: [],
        packingList: []
      })
      
      setTrip(newTrip)
      
      // Generate weather data
      const weather = await generateWeatherData(startDate, endDate)
      setWeatherData(weather)
      
      // Generate packing list
      const items = await generatePackingList(destination, weather)
      setPackingItems(items)
      
      setCurrentStep('weather')
      toast.success("Trip created successfully!")
      
    } catch (err) {
      setError(err.message)
      toast.error("Failed to create trip")
    } finally {
      setLoading(false)
    }
  }

  const generateWeatherData = async (start, end) => {
    const days = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24))
    const weather = []
    
    for (let i = 0; i <= days; i++) {
      const date = addDays(new Date(start), i)
      weather.push({
        date: format(date, 'yyyy-MM-dd'),
        highTemp: Math.floor(Math.random() * 20) + 15, // 15-35°C
        lowTemp: Math.floor(Math.random() * 15) + 5,   // 5-20°C
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        precipitation: Math.floor(Math.random() * 80)
      })
    }
    
    return weather
  }

  const generatePackingList = async (dest, weather) => {
    const items = await packingItemService.getAll()
    
    // Filter items based on destination and weather
    const avgTemp = weather.reduce((sum, day) => sum + day.highTemp, 0) / weather.length
    const hasRain = weather.some(day => day.condition === 'Rainy')
    
    const relevantItems = items.filter(item => {
      if (avgTemp < 15 && item.category === 'Clothing' && item.name.includes('warm')) return true
      if (avgTemp > 25 && item.category === 'Clothing' && item.name.includes('light')) return true
      if (hasRain && item.name.toLowerCase().includes('rain')) return true
      if (item.category !== 'Clothing') return true
      return Math.random() > 0.5 // Random selection for other items
    })
    
    return relevantItems.slice(0, 15) // Limit to 15 items
  }

  const togglePackedItem = async (itemId) => {
    try {
      const item = packingItems.find(item => item.id === itemId)
      const updatedItem = await packingItemService.update(itemId, {
        ...item,
        isPacked: !item.isPacked
      })
      
      setPackingItems(prev => 
        prev.map(item => item.id === itemId ? updatedItem : item)
      )
      
      toast.success(updatedItem.isPacked ? "Item packed!" : "Item unpacked")
    } catch (err) {
      toast.error("Failed to update item")
    }
  }

  const addCustomItem = async () => {
    if (!customItem.trim()) return

    try {
      const newItem = await packingItemService.create({
        name: customItem,
        category: selectedCategory,
        quantity: 1,
        isPacked: false,
        weight: 0,
        isCustom: true
      })
      
      setPackingItems(prev => [...prev, newItem])
      setCustomItem('')
      setShowAddItem(false)
      toast.success("Item added to packing list!")
    } catch (err) {
      toast.error("Failed to add item")
    }
  }

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': 'Sun',
      'Cloudy': 'Cloud',
      'Rainy': 'CloudRain',
      'Partly Cloudy': 'CloudSun'
    }
    return icons[condition] || 'Sun'
  }

  const getPackingProgress = () => {
    if (packingItems.length === 0) return 0
    return Math.round((packingItems.filter(item => item.isPacked).length / packingItems.length) * 100)
  }

  const groupedItems = packingItems.reduce((groups, item) => {
    const category = item.category
    if (!groups[category]) groups[category] = []
    groups[category].push(item)
    return groups
  }, {})

  if (currentStep === 'setup') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 lg:p-10">
          <div className="text-center mb-8">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <ApperIcon name="MapPin" className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Plan Your Trip
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Tell us about your destination and dates to get started
            </p>
          </div>

          <form onSubmit={handleTripSetup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Destination
              </label>
              <div className="relative">
                <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <ApperIcon name="Calendar" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <ApperIcon name="Calendar" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || format(new Date(), 'yyyy-MM-dd')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-5 h-5 animate-spin" />
                  <span>Creating Trip...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="ArrowRight" className="w-5 h-5" />
                  <span>Generate Packing List</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    )
  }

  if (currentStep === 'weather') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Weather Forecast for {trip?.destination}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {format(new Date(trip?.startDate || ''), 'MMM d')} - {format(new Date(trip?.endDate || ''), 'MMM d, yyyy')}
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep('packing')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Packing List</span>
              <ApperIcon name="ArrowRight" className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {weatherData.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {format(new Date(day.date), 'EEE, MMM d')}
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <ApperIcon name={getWeatherIcon(day.condition)} className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {day.highTemp}°
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Low: {day.lowTemp}°
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {day.condition}
                </div>
                {day.precipitation > 0 && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {day.precipitation}% rain
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Packing List for {trip?.destination}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center space-x-1">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span>{format(new Date(trip?.startDate || ''), 'MMM d')} - {format(new Date(trip?.endDate || ''), 'MMM d')}</span>
              </span>
              <span className="flex items-center space-x-1">
                <ApperIcon name="Package" className="w-4 h-4" />
                <span>{packingItems.length} items</span>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep('weather')}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span>Weather</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddItem(true)}
              className="bg-gradient-to-r from-accent to-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Item</span>
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Packing Progress
            </span>
            <span className="text-sm font-bold text-primary">
              {getPackingProgress()}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${getPackingProgress()}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full shadow-sm"
            />
          </div>
        </div>

        {/* Packing Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-gray-200/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category}
                </h3>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg">
                  {items.filter(item => item.isPacked).length}/{items.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => togglePackedItem(item.id)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.isPacked 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        item.isPacked 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {item.isPacked && (
                          <ApperIcon name="Check" className="w-3 h-3 text-white" />
                        )}
                      </div>
                      
                      <div>
                        <div className={`font-medium transition-colors ${
                          item.isPacked 
                            ? 'text-green-700 dark:text-green-300 line-through' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {item.name}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {item.isCustom && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg">
                        Custom
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddItem(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Add Custom Item
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    placeholder="Enter item name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddItem(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomItem}
                  disabled={!customItem.trim()}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MainFeature