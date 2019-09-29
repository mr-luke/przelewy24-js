import { AxiosInstance } from 'axios'

import { Callbacks, Response, Transaction, Verification } from './models'
import Hasher from './hasher'
import { Payload } from './models'
import Version from './version'

/**
 * Przelewy24 driver interface.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default interface Przelewy {
  data: Payload
  version: Version
  live: boolean
  salt: string
  http: AxiosInstance
  hasher: Hasher

  /**
   * Register new payment in P24.
   */
  register (transaction: Transaction, callbacks: Callbacks): Promise<Response>

  /**
   * Test connection to P24.
   */
  test (): Promise<Response>

  /**
   * Verify transaction in P24 system.
   */
  verify (payload: Verification): Promise<Response>
}
