import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Icon from '@/components/atoms/Icon'
      import Select from '@/components/atoms/Select'

      function FormField({ label, type, value, onChange, placeholder, icon, min, required, options, inputClassName = '', labelClassName = '', className = '', ...props }) {
        const inputComponent = type === 'select' ? (
          <Select
            value={value}
            onChange={onChange}
            options={options}
            className={inputClassName}
            {...props}
          />
        ) : (
          <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            required={required}
            className={`${icon ? 'pl-10' : ''} ${inputClassName}`}
            {...props}
          />
        )

        return (
          <div className={className}>
            <Label className={labelClassName}>{label}</Label>
            <div className="relative">
              {icon && (
                <Icon name={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              {inputComponent}
            </div>
          </div>
        )
      }

      export default FormField