# Blockchain ExchangeRates Module

Get this current bitcoin exchange rates. [View full API documentation](https://blockchain.info/api/exchange_rates_api).

## Importing

```js
var exchange = require('blockchain.info/exchange')
```

## Methods

All methods accept an options *Object* parameter that can include an `apiCode` property to prevent hitting request limits.

### getTicker

Usage:

```js
exchange.getTicker(options)
```

Gets the market price of BTC compared to world currencies. Without any options specified, it responds with a JSON object that has currency codes as keys.

Options (optional):

  * `currency` - specify which currency to get data for (currency code, *string*)

### fromBTC

Usage:

```js
exchange.fromBTC(amount, currency, options)
```

Gets the historical market price of the requested BTC amount at the requested time. Responds with the value in *number* format.

Required Parameters:

  * `amount` - the amount of BTC  (satoshi, *number*)
  * `currency` - the code of the currency to convert from (currency code, *string*)

Options (optional):

  * `time` - the historical date (milliseconds since Unix epoch, *number*)

Examples:

```js
let valueBTC = 100000000; // 100000000 satoshi = 1 BTC
let valueUSD = await exchange.fromBTC(valueBTC, "USD");
```

### toBTC

Usage:

```js
exchange.toBTC(amount, currency, options)
```

Converts an amount of a given currency to BTC. Responds with a number in *string* format.

Parameters:

  * `amount` - the amount to convert (*number*)
  * `currency` - the code of the currency to convert from (currency code, *string*)

Examples:

```js
let valueUSD = 50000;
let valueBTC = await exchange.fromBTC(valueBTC, "USD");
```

