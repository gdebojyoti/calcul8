import React from 'react'

import formatDate from 'utils/formatDate'

import './style.css'

const AmortizationSchedule = ({ data }) => {
  return (
    <div>
      <h2>Amortization Schedule</h2>

      <table>
        <thead>
          <tr>
            <th>Installment #</th>
            <th>Payment Date</th>
            <th>Payment Amount</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {
            (data || []).map((row, index) => {
              const { paymentDate, paymentAmount, principalPaid, interestPaid, remainingBalance } = row
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(paymentDate)}</td>
                  <td>{paymentAmount}</td>
                  <td>{principalPaid}</td>
                  <td>{interestPaid}</td>
                  <td>{remainingBalance}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AmortizationSchedule
