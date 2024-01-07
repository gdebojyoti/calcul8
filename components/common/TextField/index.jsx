import React from 'react'

import './style.css'

const TextField = ({ type, placeholder, isReadOnly, isDisabled, value = '', onChange: onChangeProp }) => {
  const onChange = (e) => {
    e.stopPropagation()
    e.preventDefault()

    // letters not allowed for 'number' type
    if (type === 'number' && isNaN(e.target.value)) {
      onChangeProp(value)
      return
    }

    onChangeProp(e.target.value)
  }

  return (
    <input
      // type={type}
      className='input input--text-field'
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
      disabled={isDisabled}
    />
  )
}

export default TextField
