import { motion } from 'framer-motion'

      function Card({ children, className = '', initial, animate, transition, whileHover, ...props }) {
        return (
          <motion.div
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 ${className}`}
            initial={initial}
            animate={animate}
            transition={transition}
            whileHover={whileHover}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card