function Select({ value, onChange, options, className = '', ...props }) {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
            {...props}
          >
            {options.map(option => (
              <option key={option.value || option} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        )
      }

      export default Select