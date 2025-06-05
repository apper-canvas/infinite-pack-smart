import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      function FeatureCard({ icon, title, description, gradient, index }) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card hover:shadow-xl transition-all duration-300"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={icon} className="w-6 h-6 text-white" />
            </div>

            <Title tag="h4" className="text-xl mb-3">{title}</Title>

            <Text className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</Text>
          </motion.div>
        )
      }

      export default FeatureCard