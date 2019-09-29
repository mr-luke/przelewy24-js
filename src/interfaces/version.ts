import { Target } from '../types/target'

/**
 * Przelewy24 api version interface.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default interface Version {
  live: string
  test: string
  version: string
  endpoints: {[key in Target]: string}

  /**
   * Return valid endpoint for given target.
   */
  getTarget (target: Target): string

  /**
   * Returns api version.
   */
  getVersion (): string

  /**
   * Returns valid P24 base Uri due to mode.
   */
  getUri(isLive: boolean): string

  /**
   * Returns api version.
   */
  getVersion (): string
}
