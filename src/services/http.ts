import axios from 'axios'

import { HttpRequest, HttpResponse } from '../interfaces/http'
import { Payload } from '../interfaces/models'

/**
 * Http service interface.
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
        return { status: error.response.status, success: false }
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
