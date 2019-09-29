import { Config } from './interfaces/config'
import { Version as VersionContract } from './interfaces/przelewy'
import { Http as HttpContract } from './interfaces/http'
import Http from './services/http'
import Hasher from './services/hasher'
import Przelewy from './przelewy'
import Version from './services/version'

export { Hasher, HttpContract, Przelewy, VersionContract }

export default function createInstance(
  config: Config,
  http?: HttpContract,
  version?: VersionContract
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
