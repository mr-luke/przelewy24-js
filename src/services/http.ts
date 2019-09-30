import axios from 'axios'

import { HttpRequest, HttpResponse } from '../interfaces/http'
import { Payload } from '../interfaces/models'

/**
 * Http service.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default class Http {
  /**
   * Make request to external api via axios driver.
   */
  public static async request(config: HttpRequest): Promise<HttpResponse> {
    return axios.request(config)
      .then(response => {
        const data: Payload = Http.parseResponse(response.data)

        return {
          status: response.status,
          success: data.error === '0',
          data
        }
      })
      .catch(error => {
        const response: HttpResponse = { status: error.response.status, success: false }

        if (Object.prototype.hasOwnProperty.call(error.response, 'data')) {
          response.data = Http.parseResponse(error.response.data)
        }

        return response
      })
  }

  /**
   * Parse response string to Object
   */
  private static parseResponse(insert: string) {
    return insert.split('&').reduce((params: Payload, param) => {
      const [key, value] = param.split('=')
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
      return params
    }, {})
  }
}
