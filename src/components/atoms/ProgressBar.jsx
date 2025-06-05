import { motion } from 'framer-motion'

      function ProgressBar({ progress, className = '', barClassName = '' }) {
        return (
          <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 ${className}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-r from-primary to-accent h-3 rounded-full shadow-sm ${barClassName}`}
            />
          </div>
        )
      }

      export default ProgressBar