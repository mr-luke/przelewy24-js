import { Transaction as Data } from './interfaces/models'
import { Transaction } from './adapters'

describe('Check if mapper works correct', () => {
  test('Map transaction', () => {
    const transaction: Data = {
      sessionId: '123456',
      amount: 2500,
      description: 'Test product',
      email: 'user@example.com',
      items: [
        {
          name: 'Sold product',
          quantity: 1,
          price: 25
        }
      ]
    }

    expect(Transaction.map(transaction)).toEqual({
      p24_session_id: '123456',
      p24_amount: 2500,
      p24_description: 'Test product',
      p24_email: 'user@example.com',
      p24_name_1: 'Sold product',
      p24_quantity_1: 1,
      p24_price_1: 25
    })
  })
})
