import ProgressBar from '@/components/atoms/ProgressBar'
      import Text from '@/components/atoms/Text'

      function ProgressBarWithLabel({ progress, label, labelClassName = '', progressClassName = '' }) {
        return (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <Text tag="span" className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}>
                {label}
              </Text>
              <Text tag="span" className="text-sm font-bold text-primary">
                {progress}%
              </Text>
            </div>
            <ProgressBar progress={progress} className={progressClassName} />
          </div>
        )
      }

      export default ProgressBarWithLabel