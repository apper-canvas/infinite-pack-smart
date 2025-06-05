import { motion } from 'framer-motion'
      import Header from '@/components/organisms/Header'
      import Footer from '@/components/organisms/Footer'

      function DefaultPageTemplate({ darkMode, toggleDarkMode, children }) {
        return (
          <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
            <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {children}
            </motion.main>
            <Footer />
          </div>
        )
      }

      export default DefaultPageTemplate