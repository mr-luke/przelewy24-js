import { Model } from '../model'
import { Target } from '../types/target'

/**
 * Hasher service that creates md5 signature interface.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default interface Hasher {
  /**
   * Create signature based on payload and target.
   */
  getSignature(payload: Model, target: Target, salt: string): string
}
