function Title({ children, className = '', tag = 'h2', ...props }) {
        const Tag = tag
        return (
          <Tag className={`font-bold text-gray-900 dark:text-white ${className}`} {...props}>
            {children}
          </Tag>
        )
      }

      export default Title