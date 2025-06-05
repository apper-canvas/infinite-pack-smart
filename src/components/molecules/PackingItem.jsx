import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      function PackingItem({ item, togglePackedItem }) {
        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => togglePackedItem(item.id)}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
              item.isPacked
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                item.isPacked
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {item.isPacked && (
                  <Icon name="Check" className="w-3 h-3 text-white" />
                )}
              </div>

              <div>
                <Text tag="div" className={`font-medium transition-colors ${
                  item.isPacked
                    ? 'text-green-700 dark:text-green-300 line-through'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {item.name}
                </Text>
                {item.quantity > 1 && (
                  <Text tag="div" className="text-xs text-gray-500 dark:text-gray-400">
                    Qty: {item.quantity}
                  </Text>
                )}
              </div>
            </div>

            {item.isCustom && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg">
                Custom
              </span>
            )}
          </motion.div>
        )
      }

      export default PackingItem