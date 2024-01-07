import React, { useEffect } from 'react'

import InputField from 'components/common/InputField'

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
        updatedBlockData[key] = (value === '' || typeof value === 'undefined') ? '' : parseFloat(value)
        break
      default:
        updatedBlockData[key] = value
    }
    setBlockData(updatedBlockData)
  }

  return (
    <div className='data-block'>
      <h3 className='section-content'>{title}</h3>

      <div className='data-block__fields'>
        {
          fields.map((field) => {
            const { key, ...rest } = field
            return (
              <InputField
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
  const result = formula(blockData)

  return (
    <div>
      <h3>{label}</h3>
      <div>{isNaN(result) ? 'N/A' : result}</div>
    </div>
  )
}

export default DataBlock
