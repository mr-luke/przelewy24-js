import { Payload } from './interfaces/models'

export class Model {
  private data: Payload = {}

  /**
   * Set data on constructing.
   */
  constructor (dataSet: Payload = {}) {
    if (Object.keys(dataSet).length) {
      this.setMany(dataSet)
    }
  }

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
    for (const [key, value] of Object.entries(dataSet)) {
      this.set(key, value)
    }

    return this
  }
}
