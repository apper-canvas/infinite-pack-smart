import { motion } from 'framer-motion'

      function Button({ children, onClick, className = '', disabled = false, type = 'button', whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, ...props }) {
        return (
          <motion.button
            type={type}
            onClick={onClick}
            className={`transition-all duration-300 ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            disabled={disabled}
            {...props}
          >
            {children}
          </motion.button>
        )
      }

      export default Button