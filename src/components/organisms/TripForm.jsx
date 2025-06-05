import { motion } from 'framer-motion'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      import FormField from '@/components/molecules/FormField'
      import Icon from '@/components/atoms/Icon'
      import Card from '@/components/atoms/Card'

      function TripForm({ destination, setDestination, startDate, setStartDate, endDate, setEndDate, handleTripSetup, loading }) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6 md:p-8 lg:p-10">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
                >
                  <Icon name="MapPin" className="w-8 h-8 text-white" />
                </motion.div>
                <Title tag="h2" className="text-2xl md:text-3xl mb-2">
                  Plan Your Trip
                </Title>
                <Text tag="p" className="text-gray-600 dark:text-gray-300">
                  Tell us about your destination and dates to get started
                </Text>
              </div>

              <form onSubmit={handleTripSetup} className="space-y-6">
                <FormField
                  label="Destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  icon="MapPin"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Current date
                    icon="Calendar"
                    required
                  />
                  <FormField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    icon="Calendar"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="w-5 h-5 animate-spin" />
                      <span>Creating Trip...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="ArrowRight" className="w-5 h-5" />
                      <span>Generate Packing List</span>
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        )
      }

      export default TripForm