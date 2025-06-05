import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'

      function Logo({ className = '' }) {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-3 ${className}`}
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Luggage" className="w-5 h-5 md:w-6 md:h-6 text-white" />
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
        )
      }

      export default Logo