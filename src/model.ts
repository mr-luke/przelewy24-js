import * as qs from 'querystring'
import { Payload } from './interfaces/models'

/**
 * Przelewy24 data model.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export class Model {
  private data: Payload = {}

  /**
   * Set data on constructing.
   */
  constructor(dataSet: Payload = {}) {
    if (Object.keys(dataSet).length) {
      this.setMany(dataSet)
    }
  }

  /**
   * Return data as object.
   */
  /* istanbul ignore next */
  public get dataSet(): Payload {
    return this.data
  }

  /**
   * Dump all values to query string.
   */
  public dump(): string {
    return qs.stringify(this.data)
  }

  /**
   * Set value of payload.
   */
  public set(name: string, value: string|number): this {
    this.data[name] = value
    return this
  }

  /**
   * Set multiple values as once.
   */
  public setMany(dataSet: Payload): this {
    for (const [key, value] of Object.entries(dataSet)) {
      this.set(key, value)
    }

    return this
  }
}
