import calculateLoanPayment from 'utils/calculateLoanPayment'

export default function generateAmortizationSchedule (loanAmount, interestRate, termLength, paymentFrequency, firstPaymentDate) {
  const monthlyPayment = parseInt(calculateLoanPayment(loanAmount, interestRate, termLength, paymentFrequency))
  const monthlyInterestRate = (interestRate / 100) / 12
  const totalPayments = termLength * paymentFrequency

  let outstandingBalance = loanAmount
  const amortizationSchedule = []

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = outstandingBalance * monthlyInterestRate
    const principalPayment = monthlyPayment - interestPayment

    outstandingBalance -= principalPayment

    // if outstanding balance becomes negative, set it to 0
    outstandingBalance = Math.max(outstandingBalance, 0)

    const paymentDate = new Date(firstPaymentDate)
    paymentDate.setMonth(paymentDate.getMonth() + i)

    amortizationSchedule.push({
      paymentNumber: i,
      paymentDate,
      paymentAmount: monthlyPayment.toFixed(2),
      interestPaid: interestPayment.toFixed(2),
      principalPaid: principalPayment.toFixed(2),
      remainingBalance: outstandingBalance.toFixed(2)
    })
  }

  return amortizationSchedule
}
