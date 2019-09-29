const md5 = require('md5')

import * as signatures from '../../config/signature.json'

import { Model } from '../model'
import HasherContract from '../interfaces/hasher'
import { Payload } from '../interfaces/models'
import { Target } from '../types/target'

export default class Hasher implements HasherContract {
  definitions: { [key: string]: Array<string> }

  constructor () {
    this.definitions = signatures
  }

  /**
   * Create signature based on payload and target.
   */
  getSignature (payload: Model, target: Target, salt: string): string {
    return md5(
      this.composeString(
        payload.dump(),
        this.definitions[target],
        salt
      )
    )
  }

  /**
   * Compose string ready to hash.
   */
  private composeString(data: Payload, fields: Array<string>, salt: string): string {
    let composed: string = ''

    for (const f of fields) {
      composed += `${data[f]}|`
    }

    composed += salt

    return composed
  }
}
