import React, { useEffect, useState } from 'react'

import DataBlock from 'components/DataBlock'
import AmortizationSchedule from 'components/AmortizationSchedule'
import calculateLoanPayment from 'utils/calculateLoanPayment'
import calculateLoanBalance from 'utils/calculateLoanBalance'
import generateAmortizationSchedule from 'utils/generateAmortizationSchedule'

import { loanInfo } from './data'

const HomeLoansEmi = () => {
  const [blockData, setBlockData] = useState({})
  const [amortizationSchedule, setAmortizationSchedule] = useState([])

  // generate amortization schedule whenever `blockData` changes
  useEffect(() => {
    console.log('blockData inside HL', blockData)

    const { loanAmount, interestRate, loanTenure, paymentFrequency, firstPaymentDate } = blockData
    console.log('loanAmount, interestRate, loanTenure', loanAmount, interestRate, loanTenure, paymentFrequency, firstPaymentDate)

    const monthlyPayment = calculateLoanPayment(loanAmount, interestRate, loanTenure, paymentFrequency)
    console.log(`Monthly Payment (EMI): $${monthlyPayment}`)

    // Example usage:
    const numberOfYears = 4
    const loanDetails = calculateLoanBalance(loanAmount, interestRate, loanTenure, paymentFrequency, numberOfYears)

    console.log(`Interest Paid: $${loanDetails.interestPaid}`)
    console.log(`Principal Paid: $${loanDetails.principalPaid}`)
    console.log(`Outstanding Balance: $${loanDetails.outstandingBalance}`)

    const amortizationSchedule = generateAmortizationSchedule(loanAmount, interestRate, loanTenure, paymentFrequency, firstPaymentDate)
    console.log('amortizationSchedule inside HL', amortizationSchedule)
    setAmortizationSchedule(amortizationSchedule)
  }, [blockData])

  return (
    <div>
      <h1>Home Loans EMI</h1>

      <DataBlock data={loanInfo} blockData={blockData} setBlockData={setBlockData} />
      <AmortizationSchedule data={amortizationSchedule} />
    </div>
  )
}

export default HomeLoansEmi
