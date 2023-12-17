import calculateLoanPayment from 'utils/calculateLoanPayment'

export default function calculateLoanBalance (loanAmount, interestRate, termLength, paymentFrequency, numberOfYears) {
  try {
    const monthlyInterestRate = (interestRate / 100) / 12
    const numberOfPayments = numberOfYears * paymentFrequency

    let outstandingBalance = loanAmount
    let totalInterestPaid = 0
    let totalPrincipalPaid = 0

    for (let i = 0; i < numberOfPayments; i++) {
      const interestPayment = outstandingBalance * monthlyInterestRate
      const principalPayment = calculateLoanPayment(loanAmount, interestRate, termLength, paymentFrequency) - interestPayment

      totalInterestPaid += interestPayment
      totalPrincipalPaid += principalPayment
      outstandingBalance -= principalPayment

      // If outstanding balance becomes negative, set it to 0
      outstandingBalance = Math.max(outstandingBalance, 0)
    }

    return {
      interestPaid: totalInterestPaid.toFixed(2),
      principalPaid: totalPrincipalPaid.toFixed(2),
      outstandingBalance: outstandingBalance.toFixed(2)
    }
  } catch (error) {
    // console.error(error)
    return {
      interestPaid: 0,
      principalPaid: 0,
      outstandingBalance: 0
    }
  }
}
