/**
 * Transactions part definition.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */

import { Currency } from '../types/currency'
import { Status } from '../types/status'

/**
 * Callback endpoints structure interface.
 */
export interface Callbacks {
  returnUri: string
  statusUri: string
}

 /**
  * Transaction's item interface.
  */
export interface Item {
  name: string
  quantity: number
  price: number
  description?: string
  id?: number
}

/**
 * Payload ready to sign.
 */
export interface Payload {
  [key: string]: string|number
}

/**
 * Response structure interface.
 */
export interface Response {
  status: Status
  redirect?: string
}

/**
 * ResponseHttp structure interface.
 */
export interface ResponseHttp {
  status: number
  success: boolean
  data?: any
}

/**
 * New transaction interface.
 */
export interface Transaction {
  session: string|number
  amount: number
  description: string
  email: string
  client?: string
  address?: string
  zip?: string
  city?: string
  phone?: string
  language?: string
  method?: number
  shouldWait?: number
  channel?: number
  shipping?: number
  transferLabel?: string
  items: Array<Item>
}

/**
 * Przelewy24 verification response interface.
 */
export interface Verification {
  p24_merchant_id: string|number
  p24_pos_id: string|number
  p24_session_id: string|number
  p24_amount: number
  p24_currency: Currency
  p24_order_id: number
  p24_method: number
  p24_statement: string
  p24_sign: string
}
