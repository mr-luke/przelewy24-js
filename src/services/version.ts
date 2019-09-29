import { Version as Contract } from '../interfaces/przelewy'
import { Target } from '../types/target'

/**
 * Przelewy24 api version interface.
 *
 * @author    Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version   1.0.0
 * @licence   MIT
 */
export default class Version implements Contract {
  protected live: string
  protected test: string
  protected version: string
  protected endpoints: {[key in Target]: string}

  constructor() {
    this.live = 'https://secure.przelewy24.pl/'
    this.test = 'https://sandbox.przelewy24.pl/'
    this.version = '3.2'

    this.endpoints = {
      register: 'trnRegister',
      request: 'trnRequest',
      test: 'testConnection',
      verify: 'trnVerify'
    }
  }

  /**
   * Return valid endpoint for given target.
   */
  public getTarget(target: Target, isLive: boolean = false): string {
    return this.getUri(isLive) + this.endpoints[target]
  }

  /**
   * Returns api version.
   */
  public getVersion(): string {
    return this.version
  }

  /**
   * Returns valid P24 base Uri due to mode.
   */
  public getUri(isLive: boolean): string {
    return isLive ? this.live : this.test
  }
}
