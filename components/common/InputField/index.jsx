import React from 'react'

import TextField from 'components/common/InputField/TextField'
import DateField from 'components/common/InputField/DateField'
import Dropdown from 'components/common/InputField/DropdownField'

import './style.css'

const InputField = ({ label, type, ...rest }) => {
  let Field = null

  switch (type) {
    case 'dropdown':
      Field = Dropdown
      break
    case 'date':
      Field = DateField
      break
    case 'text':
    default:
      Field = TextField
      break
  }

  return (
    <label className='input-field'>
      <span className='input-field__label'>{label}</span>
      <Field {...rest} />
    </label>
  )
}

export default InputField
