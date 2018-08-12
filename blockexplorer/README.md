# Blockchain Block Explorer Module

Get the latest data regarding the block chain. [View full API documentation](https://blockchain.info/api/blockchain_api).

## Importing

```js
var blockexplorer = require('blockchain.info/blockexplorer')
```

### Usage with Testnet

```js
// import using testnet 3 network
var blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3)
```

### Usage with CORS headers

```js
// use with CORS headers
var blockexplorer = require('blockchain.info/blockexplorer').enableCors(true)
```

## Methods

All method options can include an `apiCode` property to prevent hitting request limits.

### getBlock

Usage:

```js
blockexplorer.getBlock(blockId, options)
```

Get a single block based on a block index or hash. Returns a `Block` object.

### getTx

Usage:

```js
blockexplorer.getTx(txId, options)
```

Get a single transaction based on a transaction index or hash. Returns a `Transaction` object.

### getBlockHeight

Usage:

```js
blockexplorer.getBlockHeight(height, options)
```

Get an array of blocks at the specified height. Returns an array of `Block` objects.

### getAddress

Usage:

```js
blockexplorer.getAddress(address, options)
```

Get a single address and its transactions. Returns an `Address` object.

Options (optional):

* `limit` - the number of transactions to limit the response to (*number*)
* `offset` - skip the first n transactions (*number*)

### getMultiAddress

Usage:

```js
blockexplorer.getMultiAddress(addresses, options)
```

Get information on multiple addresses.

Options (optional):

* `limit` - the number of transactions to limit the response to (*number*)
* `offset` - skip the first n transactions (*number*)

### getUnspentOutputs

Usage:

```js
blockexplorer.getUnspentOutputs(address, options)
```

Get an array of unspent outputs for an address. Returns an *array* of `UnspentOutput` objects.

Options (optional):

* `confirmations` - the minimum number of confirmations of the outputs to be included (*number*)
* `limit` - the number of outputs to limit the response to (*number*)

### getBalance

Usage:

```js
blockexplorer.getBalance(address, options)
```

Get an array of individual address balance for given addresses. Returns an *array* of `Balance` objects.

### getLatestBlock

Usage:

```js
blockexplorer.getLatestBlock(options)
```

Get the latest block on the main chain. Returns a `LatestBlock` object.

### getUnconfirmedTx

Usage:

```js
blockexplorer.getUncomfirmedTx(options)
```

Get a list of currently unconfirmed transactions. Returns an array of `Transaction` objects.

### getBlocks

Usage:

```js
blockexplorer.getBlocks(time, options)
```

Get a list of blocks for a specific day. Returns an array of `SimpleBlock` objects.

## Response Object Properties

A description of each of the objects that may be passed into the callback's `data` parameter when one of the above functions is called.

### Block Object

* **hash**: *string*
* **version**: *number*
* **previous_block**: *string*
* **merkle_root**: *string*
* **time**: *number*
* **bits**: *number*
* **fee**: *number*
* **nonce**: *number*
* **t_tx**: *number*
* **size**: *number*
* **block_index**: *number*
* **main_chain**: *boolean*
* **height**: *number*
* **received_time**: *number*
* **relayed_by**: *string*
* **transactions**: *array* of `Transaction` objects

### Transaction Object

* **double_spend**: *boolean*
* **block_height**: *number*
* **time**: *number*
* **relayed_by**: *string*
* **hash**: *string*
* **tx_index**: *number*
* **version**: *number*
* **size**: *number*
* **inputs**: *array* of `Input` objects
* **outputs**: *array* of `Output` objects

### Input Object

* **n**: *number*
* **value**: *number*
* **address**: *string*
* **tx_index**: *number*
* **type**: *number*
* **script**: *string*
* **script_sig**: *string*
* **sequence**: *number*

### Output Object

* **n**: *number*
* **value**: *number*
* **address**: *string*
* **tx_index**: *number*
* **script**: *string*
* **spent**: *number*

### Address Object

* **hash160**: *string*
* **address**: *string*
* **n_tx**: *number*
* **total_received**: *number*
* **total_sent**: *number*
* **final_balance**: *number*
* **transactions**: *array* of `Transaction` objects

### UnspentOutput Object

* **tx_hash**: *string*
* **tx_index**: *number*
* **tx_output_n**: *number*
* **script**: *string*
* **value**: *number*
* **value_hex**: *string*
* **confirmations**: *number*

### Balance Object
* **final_balance**: *number*
* **n_tx**: *number*
* **total_received**: *number*

### LatestBlock Object

* **hash**: *string*
* **time**: *number*
* **block_index**: *number*
* **height**: *number*
* **tx_indexes**: *array* of tx indices (*number*)

### SimpleBlock Object

* **height**: *number*
* **hash**: *string*
* **time**: *number*
* **main_chain**: *boolean*
