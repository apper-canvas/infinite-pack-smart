import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <ApperIcon name="Luggage" className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  PackSmart
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Smart Packing Assistant</p>
              </div>
            </motion.div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-neu-light dark:shadow-neu-dark"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300" 
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative py-12 md:py-20 lg:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Pack Smart,{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Travel Better
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate personalized packing lists based on your destination, weather forecast, and trip duration. Never forget essentials again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm"
              >
                <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Any Destination</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm"
              >
                <ApperIcon name="Cloud" className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Weather Aware</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm"
              >
                <ApperIcon name="CheckCircle" className="w-5 h-5 text-accent" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Smart Lists</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Feature Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative py-12 md:py-16 lg:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-12 md:py-16 lg:py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PackSmart?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced features designed to make your travel preparation effortless and comprehensive.
            </p>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Luggage" className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold">PackSmart</h4>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Making travel preparation smarter, faster, and more organized for every journey.
            </p>
            
            <div className="text-sm text-gray-500">
              © 2024 PackSmart. Designed for smart travelers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home