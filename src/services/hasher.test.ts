import Hasher from './hasher'
import { Model } from '../model'
import { Target } from '../types/target'

describe('Hashing 3 different targets', () => {
  test('Register transaction signature', () => {
    const hasher = new Hasher()

    const data = (new Model()).set('p24_session_id', 'abcdefghijk')
      .set('p24_merchant_id', '9999')
      .set('p24_amount', '2500')
      .set('p24_currency', 'PLN')

    expect(
      hasher.getSignature(data, Target.register, 'a123b456c789d012')
    ).toEqual('6c7f0bb62c046fbc89921dc3b2b23ede')
  })

  test('Test connection signature', () => {
    const hasher = new Hasher()

    const data = (new Model()).set('p24_pos_id', '9999')

    expect(
      hasher.getSignature(data, Target.test, 'a123b456c789d012')
    ).toEqual('55a2740da39c91012a4fb0bb78149a4e')
  })

  test('Verify order signature', () => {
    const hasher = new Hasher()

    const data = (new Model()).set('p24_session_id', 'abcdefghijk')
      .set('p24_order_id', 'AD56789GH')
      .set('p24_amount', '100')
      .set('p24_currency', 'PLN')

    expect(
      hasher.getSignature(data, Target.verify, 'a123b456c789d012')
    ).toEqual('c747380efaa272ae770b0a4915e666f5')
  })
})
