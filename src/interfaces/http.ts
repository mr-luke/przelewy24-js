import { AxiosRequestConfig } from 'axios'

/**
 * Http service interface.
 */
export interface Http {
  request(config: HttpRequest): Promise<HttpResponse>
}

/**
 * Http request structure interface.
 */
export interface HttpRequest extends AxiosRequestConfig {
  url: string
}

/**
 * Http response structure interface.
 */
export interface HttpResponse {
  status: number
  success: boolean
  data?: any
}
