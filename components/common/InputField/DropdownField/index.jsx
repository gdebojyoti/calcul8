import React from 'react'

const DropdownField = ({ options, value = '', onChange: onChangeProp }) => {
  const onChange = (e) => {
    e.stopPropagation()
    e.preventDefault()

    onChangeProp(e.target.value)
  }

  return (
    <select
      value={value}
      onChange={onChange}
    >
      {options.map((option) => {
        const { label, value } = option
        return (
          <option key={value} value={value}>
            {label}
          </option>
        )
      })}
    </select>
  )
}

export default DropdownField
