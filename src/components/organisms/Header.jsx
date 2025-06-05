import { motion } from 'framer-motion'
      import Logo from '@/components/atoms/Logo'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'

      function Header({ darkMode, onToggleDarkMode }) {
        return (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/30"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                <Logo />

                <Button
                  onClick={onToggleDarkMode}
                  className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-neu-light dark:shadow-neu-dark"
                >
                  <Icon
                    name={darkMode ? "Sun" : "Moon"}
                    className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300"
                  />
                </Button>
              </div>
            </div>
          </motion.header>
        )
      }

      export default Header