import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      function Footer() {
        return (
          <footer className="bg-gray-900 dark:bg-black text-white py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Icon name="Luggage" className="w-6 h-6 text-white" />
                  </div>
                  <Title tag="h4" className="text-2xl">PackSmart</Title>
                </div>

                <Text className="text-gray-400 mb-8 max-w-md mx-auto">
                  Making travel preparation smarter, faster, and more organized for every journey.
                </Text>

                <Text className="text-sm text-gray-500">
                  © 2024 PackSmart. Designed for smart travelers.
                </Text>
              </div>
            </div>
          </footer>
        )
      }

      export default Footer