import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-xl"
        >
          <ApperIcon name="MapPin" className="w-16 h-16 text-white" />
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Destination Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looks like this page packed up and left! Let's get you back on track to your packing adventure.
        </p>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound