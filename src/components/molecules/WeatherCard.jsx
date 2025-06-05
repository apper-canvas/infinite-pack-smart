import { motion } from 'framer-motion'
      import { format } from 'date-fns'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      function WeatherCard({ day, index, getWeatherIcon }) {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <Text tag="div" className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {format(new Date(day.date), 'EEE, MMM d')}
            </Text>

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Icon name={getWeatherIcon(day.condition)} className="w-6 h-6 text-white" />
              </div>
            </div>

            <Text tag="div" className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {day.highTemp}°
            </Text>
            <Text tag="div" className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Low: {day.lowTemp}°
            </Text>
            <Text tag="div" className="text-xs text-gray-500 dark:text-gray-500">
              {day.condition}
            </Text>
            {day.precipitation > 0 && (
              <Text tag="div" className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {day.precipitation}% rain
              </Text>
            )}
          </motion.div>
        )
      }

      export default WeatherCard