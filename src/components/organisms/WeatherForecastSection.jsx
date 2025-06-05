import { motion } from 'framer-motion'
      import { format } from 'date-fns'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import WeatherCard from '@/components/molecules/WeatherCard'
      import Card from '@/components/atoms/Card'

      function WeatherForecastSection({ trip, weatherData, setCurrentStep }) {
        const getWeatherIcon = (condition) => {
          const icons = {
            'Sunny': 'Sun',
            'Cloudy': 'Cloud',
            'Rainy': 'CloudRain',
            'Partly Cloudy': 'CloudSun'
          }
          return icons[condition] || 'Sun'
        }

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div>
                  <Title tag="h2" className="text-2xl md:text-3xl mb-2">
                    Weather Forecast for {trip?.destination}
                  </Title>
                  <p className="text-gray-600 dark:text-gray-300">
                    {format(new Date(trip?.startDate || ''), 'MMM d')} - {format(new Date(trip?.endDate || ''), 'MMM d, yyyy')}
                  </p>
                </div>

                <Button
                  onClick={() => setCurrentStep('packing')}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>View Packing List</span>
                  <Icon name="ArrowRight" className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {weatherData.map((day, index) => (
                  <WeatherCard key={index} day={day} index={index} getWeatherIcon={getWeatherIcon} />
                ))}
              </div>
            </Card>
          </motion.div>
        )
      }

      export default WeatherForecastSection