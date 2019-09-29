import { Target } from '../types/target'
import Version from './version'

describe('Api Version structure', () => {
  test('Check if returns correct Url in test mode', () => {
    const version = new Version()

    expect(version.getUri(false)).toEqual('https://sandbox.przelewy24.pl/')
  })

  test('Check if returns correct Url in live mode', () => {
    const version = new Version()

    expect(version.getUri(true)).toEqual('https://secure.przelewy24.pl/')
  })

  test('Check if returns correct endpoint for new transaction in test mode', () => {
    const version = new Version()

    expect(
      version.getTarget(Target.register, false)
    ).toEqual('https://sandbox.przelewy24.pl/trnRegister')
  })

  test('Check if returns correct endpoint for connection in live mode', () => {
    const version = new Version()

    expect(
      version.getTarget(Target.test, true)
    ).toEqual('https://secure.przelewy24.pl/testConnection')
  })

  test('Check if returns correct endpoint for transaction verfication in test mode', () => {
    const version = new Version()

    expect(
      version.getTarget(Target.verify, false)
    ).toEqual('https://sandbox.przelewy24.pl/trnVerify')
  })
})
