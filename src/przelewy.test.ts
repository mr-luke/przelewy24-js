import przelewyFactory from './index'
import { Callbacks, Transaction, Verification } from './interfaces/models'
import { Currency } from './types/currency'
import Http from './services/http'
import { Model } from './model'
import { Transaction as Adapter } from './adapters'
import Version from './services/version'

jest.mock('./services/http')
const mocked = Http as jest.Mocked<typeof Http>

describe('Przelewy24 autconfig', () => {
  const przelewy = przelewyFactory({
    live: true,
    merchant: 9999,
    currency: 'PLN',
    country: 'PL',
    salt: 'a123b456c789d012'
  })

  test('Check live value', () => {
    expect(przelewy.live).toBe(true)
  })
})

describe('Przelewy24 main driver', () => {
  const przelewy = przelewyFactory(
    {
      live: false,
      merchant: 9999,
      pos: 9999,
      currency: 'PLN',
      country: 'PL',
      salt: 'a123b456c789d012'
    },
    mocked,
    new Version()
  )

  const callbacks: Callbacks = {
    returnUri: 'https://return.pl',
    statusUri: 'https://status.pl'
  }

  const transaction: Transaction = {
    sessionId: 'abcdefghijk',
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

  const verification: Verification = {
    p24_merchant_id: 9999,
    p24_pos_id: 9999,
    p24_session_id: 'abcdefghijk',
    p24_amount: 2500,
    p24_currency: Currency.PLN,
    p24_order_id: 1239,
    p24_method: 1,
    p24_statement: 'Supper transfer',
    p24_sign: ''
  }

  test('Check if test connection respond correctly', async () => {
    mocked.request.mockResolvedValue({ status: 200, success: true })

    const expectedPayload: Model =  new Model({
      p24_merchant_id: 9999,
      p24_pos_id: 9999,
      p24_sign: '55a2740da39c91012a4fb0bb78149a4e'
    })

    const response = await przelewy.test()

    expect(mocked.request).toBeCalledWith({
      url: 'https://sandbox.przelewy24.pl/testConnection',
      data: expectedPayload
    })

    expect(response).toEqual({
      status: 'success'
    })
  })

  test('Check if test connection caught errors', () => {
    mocked.request.mockResolvedValue({
      status: 400,
      success: false,
      data: {
        error: 'err1'
      }
    })

    return expect(przelewy.test()).rejects.toEqual({
      status: 'fail',
      errors: {
        status: 400,
        success: false,
        data: {
          error: 'err1'
        }
      }
    })
  })

  test('Check if register respond correctly', async () => {
    mocked.request.mockResolvedValue({
      status: 200,
      success: true,
      data: {
        error: 0,
        token: 1234
      }
    })

    const expectedPayload: Model =  new Model({
      p24_merchant_id: 9999,
      p24_pos_id: 9999,
      p24_api_version: '3.2',
      p24_encoding: 'UTF-8',
      p24_currency: 'PLN',
      p24_country: 'PL',
      p24_url_return: callbacks.returnUri,
      p24_url_status: callbacks.statusUri,
      ...Adapter.map(transaction),
      p24_sign: '6c7f0bb62c046fbc89921dc3b2b23ede'
    })

    const response = await przelewy.register(transaction, callbacks)

    expect(mocked.request).toBeCalledWith({
      url: 'https://sandbox.przelewy24.pl/trnRegister',
      data: expectedPayload
    })

    expect(response).toEqual({
      status: 'success',
      redirect: 'https://sandbox.przelewy24.pl/trnRequest/1234'
    })
  })

  test('Check if register caught errors', () => {
    mocked.request.mockResolvedValue({
      status: 400,
      success: false,
      data: {
        error: 'err1'
      }
    })

    return expect(przelewy.register(transaction, callbacks)).rejects.toEqual({
      status: 'fail',
      errors: {
        status: 400,
        success: false,
        data: {
          error: 'err1'
        }
      }
    })
  })

  test('Check if verfify respond correctly', async () => {
    mocked.request.mockResolvedValue({
      status: 200,
      success: true,
      data: {
        error: 0
      }
    })

    const expectedPayload: Model = new Model({
      p24_merchant_id: 9999,
      p24_pos_id: 9999,
      p24_session_id: 'abcdefghijk',
      p24_amount: 2500,
      p24_currency: 'PLN',
      p24_order_id: 1239,
      p24_sign: 'c22ee4ef4e681ff2099cbf1413a4f399'
    })

    const response = await przelewy.verify(verification)

    expect(mocked.request).toBeCalledWith({
      url: 'https://sandbox.przelewy24.pl/trnVerify',
      data: expectedPayload
    })

    expect(response).toEqual({
      status: 'success'
    })
  })

  test('Check if verify caught errors', () => {
    mocked.request.mockResolvedValue({
      status: 400,
      success: false,
      data: {
        error: 'err1'
      }
    })

    return expect(przelewy.verify(verification)).rejects.toEqual({
      status: 'fail',
      errors: {
        status: 400,
        success: false,
        data: {
          error: 'err1'
        }
      }
    })
  })
})
