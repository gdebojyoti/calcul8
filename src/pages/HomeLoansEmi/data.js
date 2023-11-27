import calculateLoanPayment from 'utils/calculateLoanPayment'

export const loanInfo = {
  title: 'Loan Information',
  fields: [
    {
      key: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      placeholder: 'Enter loan amount',
      defaultValue: 10000000
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
      defaultValue: 5
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
  result: {
    label: 'Monthly Payment (EMI)',
    formula: (blockData) => {
      const { loanAmount, interestRate, loanTenure, paymentFrequency } = blockData
      console.log('loanAmount, interestRate, loanTenure', loanAmount, interestRate, loanTenure, paymentFrequency)
      return calculateLoanPayment(parseFloat(loanAmount), parseFloat(interestRate), parseFloat(loanTenure), paymentFrequency)
    }
  }
}
