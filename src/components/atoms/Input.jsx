function Input({ type, value, onChange, placeholder, className = '', min, required = false, ...props }) {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            required={required}
            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${className}`}
            {...props}
          />
        )
      }

      export default Input