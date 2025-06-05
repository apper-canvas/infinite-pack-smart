import { motion } from 'framer-motion'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import InfoTag from '@/components/molecules/InfoTag'

      function HeroSection() {
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative py-12 md:py-20 lg:py-24 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>

            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float hidden lg:block"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <Title
                  tag="h2"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
                >
                  Pack Smart,{' '}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Travel Better
                  </span>
                </Title>

                <Text tag="p" className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Generate personalized packing lists based on your destination, weather forecast, and trip duration. Never forget essentials again.
                </Text>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <InfoTag
                    iconName="MapPin"
                    iconClassName="w-5 h-5 text-primary"
                    text="Any Destination"
                    textClassName="text-gray-700 dark:text-gray-300"
                  />
                  <InfoTag
                    iconName="Cloud"
                    iconClassName="w-5 h-5 text-secondary"
                    text="Weather Aware"
                    textClassName="text-gray-700 dark:text-gray-300"
                  />
                  <InfoTag
                    iconName="CheckCircle"
                    iconClassName="w-5 h-5 text-accent"
                    text="Smart Lists"
                    textClassName="text-gray-700 dark:text-gray-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.section>
        )
      }

      export default HeroSection