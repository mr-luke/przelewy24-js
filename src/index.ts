import { Config } from './interfaces/config'
import {
  Przelewy as PrzelewyInstance,
  Version as VersionInstance
} from './interfaces/przelewy'

import { Http as HttpInstance, HttpRequest, HttpResponse } from './interfaces/http'
import {
  Callbacks,
  Item as TransactionItem,
  Response,
  Transaction,
  Verification
} from './interfaces/models'

import Http from './services/http'
import Hasher from './services/hasher'
import Przelewy from './przelewy'
import Version from './services/version'

export {
  Callbacks,
  Hasher,
  Http,
  HttpInstance,
  HttpRequest,
  HttpResponse,
  Przelewy,
  PrzelewyInstance,
  Response,
  Transaction,
  TransactionItem,
  Verification,
  Version,
  VersionInstance
}

export default function createInstance(
  config: Config,
  http?: HttpInstance,
  version?: VersionInstance
): Przelewy {
  const versionInstance = version ? version : new Version()
  const httpInstance = http ? http : Http

  return new Przelewy(
    config,
    versionInstance,
    httpInstance,
    new Hasher()
  )
}
