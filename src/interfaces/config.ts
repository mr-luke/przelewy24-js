/**
 * Przelewy24 configuration object.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export interface Config {
  live: boolean
  merchant: any
  pos: any|null
  currency: string
  country: string
  salt: string
}
