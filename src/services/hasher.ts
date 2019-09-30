import * as md5 from 'md5'

import * as signatures from '../maps/signature.json'

import { Model } from '../model'
import HasherContract from '../interfaces/hasher'
import { Payload } from '../interfaces/models'
import { Target } from '../types/target'

/**
 * Hasing service - md5.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default class Hasher implements HasherContract {
  protected definitions: { [key: string]: string[] }

  constructor() {
    this.definitions = signatures
  }

  /**
   * Create signature based on payload and target.
   */
  public getSignature(payload: Model, target: Target, salt: string): string {
    return md5(
      this.composeString(
        payload.dataSet,
        this.definitions[target],
        salt
      )
    )
  }

  /**
   * Compose string ready to hash.
   */
  private composeString(data: Payload, fields: string[], salt: string): string {
    let composed: string = ''

    for (const f of fields) {
      composed += `${data[f]}|`
    }

    composed += salt

    return composed
  }
}
