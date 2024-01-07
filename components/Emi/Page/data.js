import calculateLoanPayment from 'utils/emi/calculateLoanPayment'
import { calculateTotalPrepayments, calculateInterestSaved } from 'utils/emi'

export const loanInfo = {
  title: 'Loan Information',
  fields: [
    {
      key: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      placeholder: 'Enter loan amount',
      defaultValue: 100000
    },
    {
      key: 'interestRate',
      label: 'Interest Rate',
      type: 'number',
      placeholder: 'Enter interest rate',
      defaultValue: 8
    },
    {
      key: 'loanTenure',
      label: 'Loan Tenure',
      type: 'number',
      placeholder: 'Enter loan tenure',
      defaultValue: 1
    },
    {
      key: 'firstPaymentDate',
      label: 'First Payment Date',
      type: 'date',
      placeholder: 'Enter first payment date',
      defaultValue: '2023-11-14'
    },
    {
      key: 'compoundPeriod',
      label: 'Compound Period',
      type: 'dropdown',
      placeholder: 'Select compound period',
      options: [
        {
          label: 'Monthly',
          value: 'monthly'
        },
        {
          label: 'Quarterly',
          value: 'quarterly'
        },
        {
          label: 'Half Yearly',
          value: 'halfYearly'
        },
        {
          label: 'Yearly',
          value: 'yearly'
        }
      ]
    },
    {
      key: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'dropdown',
      placeholder: 'Select payment frequency',
      defaultValue: 12,
      options: [
        {
          label: 'Monthly',
          value: 12
        },
        {
          label: 'Quarterly',
          value: 4
        },
        {
          label: 'Half Yearly',
          value: 2
        },
        {
          label: 'Yearly',
          value: 1
        }
      ]
    }
  ],
  results: data => [
    {
      label: 'Monthly Payment (EMI)',
      formula: () => {
        const { loanAmount, interestRate, loanTenure, paymentFrequency } = data
        return calculateLoanPayment(parseFloat(loanAmount), parseFloat(interestRate), parseFloat(loanTenure), paymentFrequency)
      }
    }
  ]
}

export const prepaymentInfo = {
  title: 'Pre-payment details',
  fields: [
    {
      key: 'startAt',
      label: 'Start at installment number',
      type: 'number',
      placeholder: 'Enter installment number',
      defaultValue: 1
    },
    {
      key: 'prepaymentAmount',
      label: 'Prepayment Amount',
      type: 'number',
      placeholder: 'Enter prepayment amount',
      defaultValue: 10000
    },
    {
      key: 'prepaymentInterval',
      label: 'Prepayment Interval',
      type: 'number',
      placeholder: 'Enter prepayment interval',
      defaultValue: 2
    },
    {
      key: 'additionalAnnualPrepayment',
      label: 'Additional Annual Prepayment',
      type: 'number',
      placeholder: 'Enter additional annual prepayment'
      // defaultValue: 1000
    }
  ],
  results: data => [
    {
      label: 'Total Prepayments',
      formula: () => {
        const { loanTenure, paymentFrequency, startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment } = data

        const totalPrepayments = calculateTotalPrepayments(startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment, loanTenure, paymentFrequency)

        return totalPrepayments
      }
    },
    {
      label: 'Interest Saved',
      formula: () => {
        const { loanAmount, interestRate, loanTenure, paymentFrequency, startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment } = data

        const totalPrepayments = calculateTotalPrepayments(startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment, loanTenure, paymentFrequency)

        // return calculateInterestSaved(loanAmount, interestRate, loanTenure, paymentFrequency, totalPrepayments)
        const interestSaved = calculateInterestSaved(loanAmount, interestRate, loanTenure, paymentFrequency, totalPrepayments, prepaymentAmount, prepaymentInterval, startAt, additionalAnnualPrepayment)

        return interestSaved
      }
    }
  ]
}

// Can you now please update the `generateAmortizationSchedule` method to include
