import { Payload } from './interfaces/models'

export class Model {
  private data: Payload = {}

  /**
   * Dump all values to object.
   */
  dump (): Payload {
    return this.data
  }

  /**
   * Set value of payload.
   */
  set (name: string, value: string|number): this {
    this.data[name] = value
    return this
  }

  /**
   * Set multiple values as once.
   */
  setMany (dataSet: Payload): this {
    for (const [value, index] of Object.entries(dataSet)) {
      this.set(index, value)
    }

    return this
  }
}
