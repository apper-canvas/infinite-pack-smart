function Text({ children, className = '', tag = 'p', ...props }) {
        const Tag = tag
        return (
          <Tag className={className} {...props}>
            {children}
          </Tag>
        )
      }

      export default Text