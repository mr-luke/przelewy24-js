# Przelewy24 javascript driver

Package is build in Typescript with target build set to ES5.
> Warning! This is still RC.

* [Installation](#installation)
* [Getting started](#getting-started)
* [Methods](#methods)
* [Przelewy driver Api](#przelewy-driver-api)
* [Custom instance](#custom-instance)

## Installation

To install through npm, simply put the following lines into `package.json`

```json
{
    "dependencies": {
        "@mr-luke/przelewy24": "~1.0"
    }
}
```

or use the following command:

```bash
npm i @mr-luke/przelewy24
```

## Getting started

Javasrcript sample:

```javascript
import createInstance from '@mr-luke/przelewy24'

const przelewy24 = createInstance({
  live: false
  merchant: 12345
  currency: 'PLN'
  country: 'PL'
  salt: 'abcdefghi'
})

przelewy24.test().then(response => {
  if (response.status == 'success') {
    console.log('Test connection succeed.')
  } else {
    console.log('Test connection failed.')
  }
})
```

Typescript sample:

```typescript
import createInstance from '@mr-luke/przelewy24'
import { Config, PrzelewyInstance, Response } from '@mr-luke/przelewy24'

const config: Config = {
  live: false
  merchant: 12345
  currency: 'PLN'
  country: 'PL'
  salt: 'abcdefghi'
}
const przelewy24: PrzelewyInstance = createInstance(config)

przelewy24.test().then(response: Response => {
  if (response.status == 'success') {
    console.log('Test connection succeed.')
  } else {
    console.log('Test connection failed.')
  }
})
```

> The following documentation will be written using Typescript notation to be more specify about structure requirements.

## Methods

`PrzelewyInstance` provides 3 methods to interact with Przelewy24 payments provider. You can `test` connection, `register` new transaction or `verify` callback from the provider.

* `przelewy24.test(): Promise<Response>`
  > test your connection with Przelewy24

* `przelewy24.register(transaction: Transaction, callbacks: Callbacks): Promise<Response>`
  > register new transaction in Przelewy24 & return redirect transaction Url

* `przelewy24.verify(payload: Verification): Promise<Response>`
  > verify & confirm transaction from callback call

## Przelewy driver Api

#### Callbacks
Object interface.

```typescript
interface Config {
  returnUri: string
  statusUri: string
}
```

#### Hasher
Hasher class uses to create md5 `signature`.

#### Http
Http class uses to call przelewy24 http api.


#### HttpInstance
Http class interface.

```typescript
interface Http {
  request(config: HttpRequest): Promise<HttpResponse>
}
```

#### HttpRequest
Object interface.

```typescript
interface HttpRequest {
  url: string
  data: object
}
```

#### HttpResponse
Object interface.

```typescript
interface HttpResponse {
  status: number
  success: boolean
  data?: any
}
```

#### Przelewy
Przelewy class uses to prepare & communicate with przelewy24 api.

#### PrzelewyInstance
Przelewy class interface.

```typescript
interface Przelewy {
  live: boolean

  register(transaction: Transaction, callbacks: Callbacks): Promise<Response>
  test(): Promise<Response>
  verify(payload: Verification): Promise<Response>
}
```

#### Response
Object interface.

```javascript
{
  url: 'string'
  data: 'object'
}
```

#### Transaction
Object interface.

```typescript
interface Transaction {
  sessionId: string|number
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
  items: Item[]
}
```

#### TransactionItem
Object interface

```typescript
interface TransactionItem {
  name: string
  quantity: number
  price: number
  description?: string
  id?: number
}
```

#### Verification
Object interface

```typescript
interface Verification {
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
```

#### Version
Version class uses as a base http api configuration.

#### VersionInstance
Version class interface.

```typescript
interface Version {
  getTarget(target: Target, isLive: boolean): string
  getVersion(): string
  getUri(isLive: boolean): string
}
```

## Custom instance

You can create custom instance of `Przelewy` by following requirements from it's interface.

```typescript
import { Config, Hasher, HttpInstance, Przelewy, PrzelewyInstance, VersionInstance }

const przelewy: PrzelewyInstance = new Przelewy(
  config: Config,
  http: HttpInstance,
  version: VersionInstance
  hasher: Hasher
)
```
