import { useState, useEffect } from 'react'
      import { motion } from 'framer-motion'
      import { toast } from 'react-toastify'
      import { addDays } from 'date-fns'
      import DefaultPageTemplate from '@/components/templates/DefaultPageTemplate'
      import HeroSection from '@/components/organisms/HeroSection'
      import TripForm from '@/components/organisms/TripForm'
      import WeatherForecastSection from '@/components/organisms/WeatherForecastSection'
      import PackingListSection from '@/components/organisms/PackingListSection'
      import FeatureCard from '@/components/molecules/FeatureCard'
      import tripService from '@/services/api/tripService'
      import packingItemService from '@/services/api/packingItemService'
      import weatherForecastService from '@/services/api/weatherForecastService'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      function HomePage() {
        const [darkMode, setDarkMode] = useState(false)

        // Form States
        const [destination, setDestination] = useState('')
        const [startDate, setStartDate] = useState('')
        const [endDate, setEndDate] = useState('')
        const [currentStep, setCurrentStep] = useState('setup') // setup, weather, packing

        // Data States
        const [trip, setTrip] = useState(null)
        const [packingItems, setPackingItems] = useState([])
        const [weatherData, setWeatherData] = useState([])

        // UI States
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)

        useEffect(() => {
          if (darkMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }, [darkMode])

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
              date: date.toISOString().split('T')[0],
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

        return (
          <DefaultPageTemplate darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
            <HeroSection />

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative py-12 md:py-16 lg:py-20"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {currentStep === 'setup' && (
                  <TripForm
                    destination={destination}
                    setDestination={setDestination}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    handleTripSetup={handleTripSetup}
                    loading={loading}
                  />
                )}

                {currentStep === 'weather' && (
                  <WeatherForecastSection
                    trip={trip}
                    weatherData={weatherData}
                    setCurrentStep={setCurrentStep}
                  />
                )}

                {currentStep === 'packing' && (
                  <PackingListSection
                    trip={trip}
                    packingItems={packingItems}
                    setPackingItems={setPackingItems}
                    setCurrentStep={setCurrentStep}
                  />
                )}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="py-12 md:py-16 lg:py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                  <Title tag="h3" className="text-2xl sm:text-3xl md:text-4xl mb-4">
                    Why Choose PackSmart?
                  </Title>
                  <Text className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Advanced features designed to make your travel preparation effortless and comprehensive.
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[
                    {
                      icon: "Brain",
                      title: "AI-Powered Suggestions",
                      description: "Smart recommendations based on destination climate, culture, and activities.",
                      gradient: "from-blue-500 to-cyan-500"
                    },
                    {
                      icon: "CloudSun",
                      title: "Weather Integration",
                      description: "Real-time weather forecasts influence your packing list automatically.",
                      gradient: "from-purple-500 to-pink-500"
                    },
                    {
                      icon: "Package",
                      title: "Packing Optimization",
                      description: "Visual guides and tips for efficient packing and space utilization.",
                      gradient: "from-emerald-500 to-teal-500"
                    },
                    {
                      icon: "Smartphone",
                      title: "Mobile Friendly",
                      description: "Access your lists anywhere, perfect for last-minute packing checks.",
                      gradient: "from-orange-500 to-red-500"
                    },
                    {
                      icon: "Users",
                      title: "Trip Templates",
                      description: "Pre-built lists for business trips, vacations, and adventure travel.",
                      gradient: "from-indigo-500 to-purple-500"
                    },
                    {
                      icon: "BarChart3",
                      title: "Progress Tracking",
                      description: "Visual progress indicators to ensure nothing gets left behind.",
                      gradient: "from-green-500 to-emerald-500"
                    }
                  ].map((feature, index) => (
                    <FeatureCard
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      gradient={feature.gradient}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.section>
          </DefaultPageTemplate>
        )
      }

      export default HomePage