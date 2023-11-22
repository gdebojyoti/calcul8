import React, { useState } from 'react'

import DataBlock from 'components/DataBlock'

import { loanInfo } from './data'

const HomeLoansEmi = () => {
  const [] = useState()

  return (
    <div>
      <h1>Home Loans EMI</h1>

      <DataBlock data={loanInfo} />
    </div>
  )
}

export default HomeLoansEmi