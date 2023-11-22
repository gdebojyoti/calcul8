import React from 'react'

const DateField = ({ type, placeholder, isReadOnly, isDisabled, value = '', onChange: onChangeProp }) => {
  const onChange = (e) => {
    e.stopPropagation()
    e.preventDefault()

    onChangeProp(e.target.value)
  }
  
  return (
    <input
      type='date'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
      disabled={isDisabled}
    />
  )
}

export default DateField