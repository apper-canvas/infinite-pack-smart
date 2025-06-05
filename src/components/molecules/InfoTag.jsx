import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      function InfoTag({ iconName, iconClassName, text, textClassName, className = '' }) {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm ${className}`}
          >
            <Icon name={iconName} className={iconClassName} />
            <Text tag="span" className={`font-medium ${textClassName}`}>{text}</Text>
          </motion.div>
        )
      }

      export default InfoTag