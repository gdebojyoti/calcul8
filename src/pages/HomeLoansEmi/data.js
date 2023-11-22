import calculateLoanPayment from 'utils/calculateLoanPayment'
import calculateLoanBalance from 'utils/calculateLoanBalance'

export const loanInfo = {
  title: "Loan Information",
  fields: [
    {
      key: "loanAmount",
      label: "Loan Amount",
      type: "number",
      placeholder: "Enter loan amount",
      defaultValue: 10000000
    },
    {
      key: "interestRate",
      label: "Interest Rate",
      type: "number",
      placeholder: "Enter interest rate",
      defaultValue: 8
    },
    {
      key: "loanTenure",
      label: "Loan Tenure",
      type: "number",
      placeholder: "Enter loan tenure",
      defaultValue: 20
    },
    {
      key: "firstPaymentDate",
      label: "First Payment Date",
      type: "date",
      placeholder: "Enter first payment date"
    },
    {
      key: "compoundPeriod",
      label: "Compound Period",
      type: "dropdown",
      placeholder: "Select compound period",
      options: [
        {
          label: "Monthly",
          value: "monthly"
        },
        {
          label: "Quarterly",
          value: "quarterly"
        },
        {
          label: "Half Yearly",
          value: "halfYearly"
        },
        {
          label: "Yearly",
          value: "yearly"
        }
      ]
    },
    {
      key: "paymentFrequency",
      label: "Payment Frequency",
      type: "dropdown",
      placeholder: "Select payment frequency",
      defaultValue: 12,
      options: [
        {
          label: "Monthly",
          value: 12
        },
        {
          label: "Quarterly",
          value: 4
        },
        {
          label: "Half Yearly",
          value: 2
        },
        {
          label: "Yearly",
          value: 1
        }
      ]
    },
    {
      key: "emi",
      label: "Monthly Payment (EMI)",
      // type: "number",
      placeholder: "Fill other fields to calculate EMI",
      isGenerated: true,
      formula: (blockData) => {
        const { loanAmount, interestRate, loanTenure, paymentFrequency } = blockData
        console.log("loanAmount, interestRate, loanTenure", loanAmount, interestRate, loanTenure, paymentFrequency)
        return calculateLoanPayment(parseInt(loanAmount), parseInt(interestRate), parseInt(loanTenure), paymentFrequency)
      }
    }
  ]
}

// // Example usage
// const loanType = "Acc Bi-Weekly"; // "Payment Frequency"
// const interestRate = 0.05; // 5%
// const term = 5; // 5 years
// const loanAmount = 10000;

// const result = calculateLoanPayment(loanType, interestRate, term, loanAmount);
// console.log(result);

// Example usage:
const loanAmount = 10000000
const interestRate = 8 // 5%
const termLength = 20 // 3 years
const paymentFrequency = 12 // Monthly payments
const numberOfYears = 5

const monthlyPayment = calculateLoanPayment(loanAmount, interestRate, termLength, paymentFrequency)
console.log(`Monthly Payment (EMI): $${monthlyPayment}`)

// Example usage:
const loanDetails = calculateLoanBalance(loanAmount, interestRate, termLength, paymentFrequency, numberOfYears)

console.log(`Interest Paid: $${loanDetails.interestPaid}`)
console.log(`Principal Paid: $${loanDetails.principalPaid}`)
console.log(`Outstanding Balance: $${loanDetails.outstandingBalance}`)