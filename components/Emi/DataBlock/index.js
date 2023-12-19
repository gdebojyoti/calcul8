import React, { useEffect } from 'react'

import LabelledInput from 'components/Emi/LabelledInput'

import './style.css'

const DataBlock = ({ data, blockData, setBlockData, resultsArg }) => {
  const { title, fields, results } = data

  // update blockData on change of fields
  useEffect(() => {
    const updatedBlockData = {}
    fields.forEach(({ key, defaultValue, formula }) => {
      updatedBlockData[key] = typeof defaultValue === 'undefined' ? '' : defaultValue
    })
    setBlockData(updatedBlockData)
  }, [fields])

  const onChange = (key, value) => {
    const updatedBlockData = { ...blockData }
    const { type } = fields.find(field => field.key === key) || {}
    switch (type) {
      case 'number':
        updatedBlockData[key] = parseFloat(value)
        break
      default:
        updatedBlockData[key] = value
    }
    setBlockData(updatedBlockData)
  }

  return (
    <div className='data-block'>
      <h2>{title}</h2>

      <div className='data-block__fields'>
        {
          fields.map((field) => {
            const { key, ...rest } = field
            return (
              <LabelledInput
                key={key}
                value={blockData[key]}
                onChange={value => onChange(key, value)}
                {...rest}
              />
            )
          })
        }
      </div>

      {results(resultsArg).map((result, index) => <Result key={index} data={result} blockData={blockData} />)}
    </div>
  )
}

// TODO: move this to a separate file
const Result = ({ data, blockData }) => {
  const { label, formula } = data
  return (
    <div>
      <h3>{label}</h3>
      <div>{formula(blockData)}</div>
    </div>
  )
}

export default DataBlock
