import axios from 'axios'
import { AxiosInstance } from 'axios'

import { Config } from './interfaces/config'
import Contract from './interfaces/przelewy'
import { Callbacks, Response, ResponseHttp, Transaction, Verification } from './interfaces/models'
import Hasher from './interfaces/hasher'
import { Model } from './model'
import { Payload } from './interfaces/models'
import { Status } from './types/status'
import { Target } from './types/target'
import Version from './interfaces/version'

/**
 * Przelewy24 driver.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default class Przelewy24 implements Contract {
  data: Payload
  live: boolean
  version: Version
  salt: string
  http: AxiosInstance
  hasher: Hasher

  constructor (config: Config, version: Version, hasher: Hasher) {
    this.data = {}

    this.live = config.live
    this.version = version
    this.salt = config.salt
    this.http = axios.create()
    this.hasher = hasher

    this.setBaseConfig(config)
  }

  /**
   * Register new payment in P24.
   */
  async register (transaction: Transaction, callbacks: Callbacks): Promise<Response> {
    const target = this.version.getTarget(Target.register)

    const payload = (new Model).setMany(this.data)
      .set('p24_url_return', callbacks.returnUri)
      .set('p24_url_status', callbacks.statusUri)

    for (const [key, value] of Object.entries(transaction)) {
      payload.set(key, value)
    }

    payload.set('p24_sign', this.hasher.getSignature(payload, Target.register, this.salt))

    const registered = await this.makeCall(payload, target)

    if (!registered.success) {
      // Throw in case of fail to move execution to catch block
      // of Promis callbacks.
      throw registered
    }

    return {
      status: Status.Success,
      redirect: `${this.version.getTarget(Target.request)}/${registered.data.token}`
    }
  }

  /**
   * Test connection to P24.
   */
  async test (): Promise<Response> {
    const target = this.version.getTarget(Target.test)

    const payload = (new Model()).set('p24_merchant_id', this.data.p24_merchant_id)
      .set('p24_pos_id', this.data.p24_pos_id)
    payload.set('p24_sign', this.hasher.getSignature(payload, Target.test, this.salt))

    const response = await this.makeCall(payload, target)

    if (!response.success) {
      // Throw in case of fail to move execution to catch block
      // of Promis callbacks.
      throw response
    }

    return {
      status: Status.Success
    }
  }

  /**
   * Verify transaction in P24 system.
   */
  async verify (p24Response: Verification): Promise<Response> {
    const target = this.version.getTarget(Target.register)

    delete p24Response.p24_method
    delete p24Response.p24_statement
    delete p24Response.p24_sign

    const payload = (new Model).setMany(this.data)
    payload.set('p24_sign', this.hasher.getSignature(payload, Target.verify, this.salt))

    const response = await this.makeCall(payload, target)

    if (!response.success) {
      // Throw in case of fail to move execution to catch block
      // of Promis callbacks.
      throw response
    }

    return {
      status: Status.Success
    }
  }

  /**
   * Make call to P24 api.
   */
  private async makeCall (payload: Model, target: string): Promise<ResponseHttp> {
    return this.http.request({ method: 'POST', url: target, data: payload })
      .then(response => {
        const data = this.parseResponse(response.data)

        return {
          status: response.status,
          success: data === '0',
          data: data
        }
      })
      .catch(error => {
        return { status: error.response.status, success: false }
      })
  }

  /**
   * Parse response string to Object
   */
  private parseResponse (string: string) {
    return string.split('&').reduce((params: Payload, param) => {
      const [key, value] = param.split('=')
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
      return params
    }, {})
  }

  /**
   * Sets base configuration to P24 params.
   */
  private setBaseConfig (config: Config): void {
    this.data.p24_merchant_id = config.merchant

    if (Object.prototype.hasOwnProperty.call(config, 'pos') && config.pos !== null) {
      this.data.p24_pos_id = config.pos
    } else {
      this.data.p24_pos_id = this.data.merchant
    }

    this.data.p24_api_version = this.version.getVersion()
    this.data.p24_encoding = 'UTF-8'

    this.data.p24_currency = config.currency
    this.data.p24_country = config.country
  }
}
