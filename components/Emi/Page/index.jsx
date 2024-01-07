'use client'

import React, { useEffect, useState } from 'react'

import DataBlock from 'components/Emi/DataBlock'
import AmortizationSchedule from 'components/Emi/AmortizationSchedule'
import calculateLoanPayment from 'utils/emi/calculateLoanPayment'
import calculateLoanBalance from 'utils/emi/calculateLoanBalance'
import generateAmortizationSchedule from 'utils/emi/generateAmortizationSchedule'
import { calculateTotalPrepayments } from 'utils/emi'

import { loanInfo, prepaymentInfo } from './data'

const HomeLoansEmi = () => {
  const [loanInfoBlockData, setLoanInfoBlockData] = useState({})
  const [prepaymentInfoBlockData, setPrepaymentInfoBlockData] = useState({})
  const [amortizationSchedule, setAmortizationSchedule] = useState([])

  // generate amortization schedule whenever `loanInfoBlockData` changes
  useEffect(() => {
    const { loanAmount, interestRate, loanTenure, paymentFrequency, firstPaymentDate } = loanInfoBlockData || {}

    const { startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment } = prepaymentInfoBlockData || {}

    const totalPrepayments = calculateTotalPrepayments(startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment, loanTenure, paymentFrequency)
    const monthlyPayment = calculateLoanPayment(loanAmount, interestRate, loanTenure, paymentFrequency)
    console.log(`Monthly Payment (EMI): ${totalPrepayments} ${monthlyPayment}`)

    // Example usage:
    const numberOfYears = 4
    const loanDetails = calculateLoanBalance(loanAmount, interestRate, loanTenure, paymentFrequency, numberOfYears)
    console.log('Loan detatils', loanDetails)

    const amortizationSchedule = generateAmortizationSchedule(loanAmount, interestRate, loanTenure, paymentFrequency, firstPaymentDate, prepaymentAmount, prepaymentInterval, startAt)
    setAmortizationSchedule(amortizationSchedule)
  }, [loanInfoBlockData, prepaymentInfoBlockData])

  return (
    <>
      <h1>EMI Calculator: Calculate Your Monthly Payments</h1>

      <p className='section-content'>
        Welcome to our EMI (Equated Monthly Installment) calculator – your handy tool to estimate your monthly payments for loans
      </p>

      <section className='section'>
        <h2>EMI Calculator</h2>

        <DataBlock
          data={loanInfo}
          blockData={loanInfoBlockData}
          setBlockData={setLoanInfoBlockData}
          resultsArg={loanInfoBlockData}
        />
        <DataBlock
          data={prepaymentInfo}
          blockData={prepaymentInfoBlockData}
          setBlockData={setPrepaymentInfoBlockData}
          resultsArg={{ ...loanInfoBlockData, ...prepaymentInfoBlockData }}
        />

        <AmortizationSchedule data={amortizationSchedule} />
      </section>
    </>
  )
}

export default HomeLoansEmi
