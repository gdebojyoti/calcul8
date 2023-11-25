import React from 'react'

import DataBlock from 'components/DataBlock'

import { loanInfo } from './data'

const HomeLoansEmi = () => {
  return (
    <div>
      <h1>Home Loans EMI</h1>

      <DataBlock data={loanInfo} />
    </div>
  )
}

export default HomeLoansEmi
