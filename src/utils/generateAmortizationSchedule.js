import calculateLoanPayment from 'utils/calculateLoanPayment'

/**
 * Generates an amortization schedule for a loan.
 *
 * @param {number} loanAmount - The amount of the loan.
 * @param {number} interestRate - The interest rate for the loan.
 * @param {number} termLength - The length of the loan term in years.
 * @param {number} paymentFrequency - The number of payments per year.
 * @param {Date} firstPaymentDate - The date of the first payment.
 * @param {number} prepaymentAmount - The amount of prepayment to be deducted.
 * @param {number} prepaymentInterval - The interval at which prepayments are made.
 * @param {number} startAt - The installment number at which prepayments start.
 * @returns {Array} - The amortization schedule as an array of objects.
 */
export default function generateAmortizationSchedule (loanAmount, interestRate, termLength, paymentFrequency, firstPaymentDate, prepaymentAmount, prepaymentInterval, startAt) {
  const monthlyPayment = calculateLoanPayment(loanAmount, interestRate, termLength, paymentFrequency)
  const monthlyInterestRate = (interestRate / 100) / 12
  const totalPayments = termLength * paymentFrequency // this is the max number of payments possible; the actual number of payments will be less if there are prepayments

  let outstandingBalance = loanAmount
  const amortizationSchedule = []

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = outstandingBalance * monthlyInterestRate

    // Deduct prepayment if applicable and after the startAt installment,
    // considering prepaymentInterval and ensuring the last month prepayment
    // is only deducted if the outstanding balance after deducting the prepayment
    // amount is still greater than the usual monthly EMI
    const shouldDeductPrepayment = i >= startAt && (i - startAt) % prepaymentInterval === 0 && i < totalPayments && (outstandingBalance - prepaymentAmount) > monthlyPayment
    if (shouldDeductPrepayment) {
      outstandingBalance -= prepaymentAmount
    }

    // Deduct additional annual prepayment if applicable
    if (i % (paymentFrequency / 12) === 0) {
      // outstandingBalance -= additionalAnnualPrepayment
    }

    // Calculate the effective payment amount and principal payment
    const effectivePaymentAmount = Math.min(outstandingBalance + interestPayment, (i < totalPayments) ? monthlyPayment : outstandingBalance + interestPayment)
    const principalPayment = (i < totalPayments) ? effectivePaymentAmount - interestPayment + (shouldDeductPrepayment ? prepaymentAmount : 0) : outstandingBalance

    outstandingBalance -= shouldDeductPrepayment ? (principalPayment - prepaymentAmount) : principalPayment

    // If outstanding balance becomes negative, set it to 0
    outstandingBalance = Math.max(outstandingBalance, 0)

    const paymentDate = new Date(firstPaymentDate)
    paymentDate.setMonth(paymentDate.getMonth() + i - 1) // Subtract 1 to account for zero-based months

    effectivePaymentAmount > 0 && amortizationSchedule.push({
      paymentNumber: i,
      paymentDate,
      paymentAmount: effectivePaymentAmount.toFixed(2),
      interestPaid: interestPayment.toFixed(2),
      principalPaid: principalPayment.toFixed(2),
      prepaymentAmount: shouldDeductPrepayment ? prepaymentAmount.toFixed(2) : '',
      remainingBalance: outstandingBalance.toFixed(2)
    })
  }

  return amortizationSchedule
}
