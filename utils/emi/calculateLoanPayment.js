export default function calculateLoanPayment (loanAmount, interestRate, termLength, paymentFrequency) {
  // Convert annual interest rate to monthly and decimal
  // const monthlyInterestRate = (interestRate / 100) / 12;
  const monthlyInterestRate = (interestRate / 100) / paymentFrequency

  // Convert term length to months
  const totalPayments = termLength * paymentFrequency

  // Calculate monthly payment (EMI)
  const emi =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)

  return parseFloat(emi.toFixed(2)) // Round to 2 decimal places
}

// export default function calculateLoanPayment(loanType, interestRate, term, loanAmount) {
//   // Constants
//   const periodsPerYear = 12; // Assuming monthly payments

//   // Calculate periodic interest rate
//   const periodicInterestRate = interestRate / periodsPerYear;

//   // Switch based on loan type
//   switch (loanType) {
//     case "Acc Bi-Weekly":
//       return roundToTwo(PMT(periodicInterestRate / 24, term * 12 * 2, loanAmount));
//     case "Acc Weekly":
//       return roundToTwo(PMT(periodicInterestRate / 48, term * 12 * 4, loanAmount));
//     default:
//       return roundToTwo(PMT(periodicInterestRate, term * periodsPerYear, loanAmount));
//   }
// }

// /* NOTE: function to calculate the payment amount
//  * rate: The interest rate for each period.
//  * paymentPeriodCount: The total number of payment periods.
//  * loanAmount: The present value, or the total loan amount.
//  */
// function PMT(rate, paymentPeriodCount, loanAmount) {
//   return rate === 0 ? -loanAmount / paymentPeriodCount : -loanAmount * (rate * Math.pow(1 + rate, paymentPeriodCount)) / (Math.pow(1 + rate, paymentPeriodCount) - 1);
// }

// // Helper function to round to two decimal places
// function roundToTwo(num) {
//   return Math.round(num * 100) / 100;
// }
