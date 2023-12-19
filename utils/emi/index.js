import calculateLoanPayment from 'utils/emi/calculateLoanPayment'

export function calculateTotalPrepayments (startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment, termLength, paymentFrequency) {
  let totalPrepayments = 0
  let installmentNumber = startAt

  while (installmentNumber <= termLength * paymentFrequency) {
    totalPrepayments += prepaymentAmount
    installmentNumber += prepaymentInterval
  }

  // Add additional annual prepayments
  if (additionalAnnualPrepayment) {
    totalPrepayments += additionalAnnualPrepayment * Math.floor((termLength - 1) / (paymentFrequency / 12))
  }

  return totalPrepayments.toFixed(2)
}

export function calculateInterestSaved (loanAmount, interestRate, termLength, paymentFrequency, totalPrepayments, prepaymentAmount, prepaymentInterval, startInstallmentNumber, additionalAnnualPrepayments) {
  const monthlyPayment = calculateLoanPayment(loanAmount, interestRate, termLength, paymentFrequency)
  const monthlyInterestRate = (interestRate / 100) / 12
  const totalPayments = termLength * paymentFrequency

  let outstandingBalance = loanAmount
  let totalInterestPaid = 0

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = outstandingBalance * monthlyInterestRate
    const principalPayment = monthlyPayment - interestPayment

    // Deduct prepayment if applicable
    if (i % prepaymentInterval === 0 && i >= startInstallmentNumber && totalPrepayments > 0) {
      outstandingBalance -= prepaymentAmount
      totalPrepayments -= 1
    }

    // Deduct additional annual prepayment if applicable
    if (i % (paymentFrequency / 12) === 0 && additionalAnnualPrepayments > 0) {
      outstandingBalance -= additionalAnnualPrepayments
      additionalAnnualPrepayments -= 1
    }

    outstandingBalance -= principalPayment

    // If outstanding balance becomes negative, set it to 0
    outstandingBalance = Math.max(outstandingBalance, 0)

    totalInterestPaid += interestPayment
  }

  const interestSaved = (calculateInterestPaidWithPrepayments(loanAmount, interestRate, termLength, paymentFrequency, totalPrepayments) - totalInterestPaid).toFixed(2)

  return interestSaved
}

function calculateInterestPaidWithPrepayments (loanAmount, interestRate, termLength, paymentFrequency, startAt, prepaymentAmount, prepaymentInterval) {
  const monthlyInterestRate = (interestRate / 100) / 12
  const totalPayments = termLength * paymentFrequency

  let outstandingBalance = loanAmount
  let totalInterestPaid = 0

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = outstandingBalance * monthlyInterestRate
    const principalPayment = calculateLoanPayment(loanAmount, interestRate, termLength, paymentFrequency) - interestPayment

    // Add prepayment if applicable
    if (i % prepaymentInterval === 0 && i >= startAt) {
      outstandingBalance -= prepaymentAmount
    }

    outstandingBalance -= principalPayment

    // If outstanding balance becomes negative, set it to 0
    outstandingBalance = Math.max(outstandingBalance, 0)

    totalInterestPaid += interestPayment
  }

  return totalInterestPaid.toFixed(2)
}

// // Example usage:
// const startAt = 1
// const prepaymentAmount = 1000
// const prepaymentInterval = 12 // 12 months
// const additionalAnnualPrepayment = 5000

// const totalPrepayments = calculateTotalPrepayments(startAt, prepaymentAmount, prepaymentInterval, additionalAnnualPrepayment, termLength, paymentFrequency)

// console.log(`Total Prepayments: $${totalPrepayments}`)

// const interestSaved = calculateInterestSaved(loanAmount, interestRate, termLength, paymentFrequency, totalPrepayments)

// console.log(`Interest Saved: $${interestSaved}`)
