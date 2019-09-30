import { Payload, Transaction as Data } from './interfaces/models'
import * as itemMap from './maps/item.json'
import * as transactionMap from './maps/transaction.json'

/**
 * Przelewy24 transaction adapter.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export class Transaction {
  /**
   * Maps transaction to Przelewy24 payload.
   */
  public static map(modelData: Data): Payload {
    const iMap: Payload = itemMap
    const tMap: Payload = transactionMap
    const mapped: Payload = {}

    for (const [key, value] of Object.entries(modelData)) {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (const ikey of Object.keys(value[i])) {
            mapped[`${iMap[ikey]}${i+1}`] = value[i][ikey]
          }
        }
      } else {
        mapped[tMap[key]] = value
      }
    }

    return mapped
  }
}
