import { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import { format } from 'date-fns'
      import Title from '@/components/atoms/Title'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import ProgressBarWithLabel from '@/components/molecules/ProgressBarWithLabel'
      import PackingItem from '@/components/molecules/PackingItem'
      import FormField from '@/components/molecules/FormField'
      import packingItemService from '@/services/api/packingItemService'

      function PackingListSection({ trip, packingItems, setPackingItems, setCurrentStep }) {
        const [categories, setCategories] = useState([])
        const [customItem, setCustomItem] = useState('')
        const [selectedCategory, setSelectedCategory] = useState('Clothing')
        const [showAddItem, setShowAddItem] = useState(false)

        useEffect(() => {
          loadPackingCategories()
        }, [])

        const loadPackingCategories = () => {
          const defaultCategories = [
            'Clothing', 'Toiletries', 'Electronics', 'Documents',
            'Shoes', 'Accessories', 'Medication', 'Entertainment'
          ]
          setCategories(defaultCategories)
        }

        const togglePackedItem = async (itemId) => {
          try {
            const item = packingItems.find(item => item.id === itemId)
            const updatedItem = await packingItemService.update(itemId, {
              ...item,
              isPacked: !item.isPacked
            })

            setPackingItems(prev =>
              prev.map(item => item.id === itemId ? updatedItem : item)
            )

            toast.success(updatedItem.isPacked ? "Item packed!" : "Item unpacked")
          } catch (err) {
            toast.error("Failed to update item")
          }
        }

        const addCustomItem = async () => {
          if (!customItem.trim()) return

          try {
            const newItem = await packingItemService.create({
              name: customItem,
              category: selectedCategory,
              quantity: 1,
              isPacked: false,
              weight: 0,
              isCustom: true
            })

            setPackingItems(prev => [...prev, newItem])
            setCustomItem('')
            setShowAddItem(false)
            toast.success("Item added to packing list!")
          } catch (err) {
            toast.error("Failed to add item")
          }
        }

        const getPackingProgress = () => {
          if (packingItems.length === 0) return 0
          return Math.round((packingItems.filter(item => item.isPacked).length / packingItems.length) * 100)
        }

        const groupedItems = packingItems.reduce((groups, item) => {
          const category = item.category
          if (!groups[category]) groups[category] = []
          groups[category].push(item)
          return groups
        }, {})

        return (
          <>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <div>
                <Title tag="h2" className="text-2xl md:text-3xl mb-2">
                  Packing List for {trip?.destination}
                </Title>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" className="w-4 h-4" />
                    <span>{format(new Date(trip?.startDate || ''), 'MMM d')} - {format(new Date(trip?.endDate || ''), 'MMM d')}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Package" className="w-4 h-4" />
                    <span>{packingItems.length} items</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setCurrentStep('weather')}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center space-x-2"
                >
                  <Icon name="ArrowLeft" className="w-4 h-4" />
                  <span>Weather</span>
                </Button>

                <Button
                  onClick={() => setShowAddItem(true)}
                  className="bg-gradient-to-r from-accent to-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Icon name="Plus" className="w-4 h-4" />
                  <span>Add Item</span>
                </Button>
              </div>
            </div>

            <ProgressBarWithLabel label="Packing Progress" progress={getPackingProgress()} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-gray-200/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Title tag="h3" className="text-lg">
                      {category}
                    </Title>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg">
                      {items.filter(item => item.isPacked).length}/{items.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <PackingItem key={item.id} item={item} togglePackedItem={togglePackedItem} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {showAddItem && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setShowAddItem(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
                  >
                    <Title tag="h3" className="text-xl mb-4">
                      Add Custom Item
                    </Title>

                    <div className="space-y-4">
                      <FormField
                        label="Item Name"
                        type="text"
                        value={customItem}
                        onChange={(e) => setCustomItem(e.target.value)}
                        placeholder="Enter item name"
                        inputClassName="bg-white dark:bg-gray-700"
                      />

                      <FormField
                        label="Category"
                        type="select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        options={categories.map(cat => ({ value: cat, label: cat }))}
                        inputClassName="bg-white dark:bg-gray-700"
                      />
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <Button
                        onClick={() => setShowAddItem(false)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={addCustomItem}
                        disabled={!customItem.trim()}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Item
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )
      }

      export default PackingListSection