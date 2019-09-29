import { Callbacks, Response, Transaction, Verification } from './models'
import { Target } from '../types/target'

/**
 * Przelewy24 main interfaces.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export interface Przelewy {
  live: boolean

  /**
   * Register new payment in P24.
   */
  register(transaction: Transaction, callbacks: Callbacks): Promise<Response>

  /**
   * Test connection to P24.
   */
  test(): Promise<Response>

  /**
   * Verify transaction in P24 system.
   */
  verify(payload: Verification): Promise<Response>
}

export interface Version {
  /**
   * Return valid endpoint for given target.
   */
  getTarget(target: Target, isLive: boolean): string

  /**
   * Returns api version.
   */
  getVersion(): string

  /**
   * Returns valid P24 base Uri due to mode.
   */
  getUri(isLive: boolean): string
}
