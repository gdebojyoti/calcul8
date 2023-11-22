import React, { useEffect, useState } from 'react'

import LabelledInput from 'components/LabelledInput'

import './style.css'

const DataBlock = ({ data }) => {
  const { title, fields } = data

  const [blockData, setBlockData] = useState({})
  const [generatedData, setGeneratedData] = useState({})

  // update blockData on change of fields
  useEffect(() => {
    const updatedBlockData = {}
    fields.forEach(({ key, isGenerated, defaultValue, formula }) => {
      if (!isGenerated) {
        updatedBlockData[key] = typeof defaultValue === 'undefined' ? '' : defaultValue
      }
    })
    setBlockData(updatedBlockData)
  }, [fields])

  // update generatedData on change of blockData
  useEffect(() => {
    const newGeneratedData = { ...generatedData }
    fields.forEach(({ key, isGenerated, formula }) => {
      if (isGenerated) {
        newGeneratedData[key] = formula(blockData)
      }
    })
    setGeneratedData(newGeneratedData)
  }, [blockData])

  const onChange = (key, value) => {
    const updatedBlockData = { ...blockData }
    updatedBlockData[key] = value
    setBlockData(updatedBlockData)
  }

  console.log("blockData", blockData)

  return (
    <div className='data-block'>
      <h2>{ title }</h2>

      <div className='data-block__fields'>
        {
          fields.map((field) => {
            const { key, isGenerated, ...rest } = field
            if (isGenerated) {
              console.log("isGenerated", key, generatedData[key])
            }
            return (
              <LabelledInput
                isDisabled={isGenerated}
                key={key}
                value={isGenerated ? generatedData[key] : blockData[key]}
                onChange={value => onChange(key, value)}
                {...rest}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default DataBlock