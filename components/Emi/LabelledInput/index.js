import React from 'react'

import TextField from 'components/Emi/TextField'
import DateField from 'components/Emi/DateField'
import Dropdown from 'components/Emi/Dropdown'

const LabelledInput = ({ label, type, ...rest }) => {
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
    <label>
      <span>{label}</span>
      <Field {...rest} />
    </label>
  )
}

export default LabelledInput
