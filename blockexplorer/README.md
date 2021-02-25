# Blockchain Block Explorer Module

Get the latest data regarding the block chain. [View full API documentation](https://blockchain.info/api/blockchain_api).

## Importing

```js
var blockexplorer = require('blockchain.info/blockexplorer');
```

### Usage with Testnet

```js
// import using testnet 3 network
var blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3);
```

## Methods

All method options can include an `apiCode` property to prevent hitting request limits.

### getBlock

Get a single block based on a block index or hash. Returns a `Block` object.

Params:

* `blockId` - block hash or index (*string*)

Usage:
```js
block = await blockexplorer.getBlock('000000000000000016f9a2c3e0f4c1245ff24856a79c34806969f5084f410680');
```

### getTx

Get a single transaction based on a transaction index or hash. Returns a `Transaction` object.

Params:

* `txId` - transaction hash or index (*string*)

Usage:
```js
tx = await blockexplorer.getTx('d4af240386cdacab4ca666d178afc88280b620ae308ae8d2585e9ab8fc664a94');
```

### getBlockHeight

Get an array of blocks at the specified height. Returns an array of `Block` objects.

Params:

* `height` - block height (*number*)

Usage:
```js
blocks = await blockexplorer.getBlockHeight(2570);
```

### getAddress

Get a single address and its transactions. Returns an `Address` object.

Params:

* `address` - address(base58 or hash160) to look up (*string*)

Options (optional):

* `limit` - the number of transactions to limit the response to (*number*)
* `offset` - skip the first n transactions (*number*)

Usage:
```js
address = await blockexplorer.getAddress('1HS9RLmKvJ7D1ZYgfPExJZQZA1DMU3DEVd');
```

### getMultiAddress

Get information on multiple addresses.

Params:

* `addresses` - addresses(base58 or xpub) to look up (*array* of `Address` Objects)

Options (optional):

* `limit` - the number of transactions to limit the response to (*number*)
* `offset` - skip the first n transactions (*number*)

Usage:

```js
addresses = await blockexplorer.getMultiAddress('1HS9RLmKvJ7D1ZYgfPExJZQZA1DMU3DEVd', xpub6CmZamQcHw2TPtbGmJNEvRgfhLwitarvzFn3fBYEEkFTqztus7W7CNbf48Kxuj1bRRBmZPzQocB6qar9ay6buVkQk73ftKE1z4tt9cPHWRn)
```

### getUnspentOutputs

Get an array of unspent outputs for an address. Returns an *array* of `UnspentOutput` objects.

Params:

* `address` - address(base58 or xpub) to look up (*string*)

Options (optional):

* `confirmations` - the minimum number of confirmations of the outputs to be included (*number*)
* `limit` - the number of outputs to limit the response to (*number*)

Usage:

```js
outs = await blockexplorer.getUnspentOutputs('1HS9RLmKvJ7D1ZYgfPExJZQZA1DMU3DEVd');
```

### getBalance

Get an array of individual address balance for given addresses. Returns an *array* of `Balance` objects.

Params:

* `address` - address(base58 or xpub) to look up (*string*)

Usage:

```js
blockexplorer.getBalance('1HS9RLmKvJ7D1ZYgfPExJZQZA1DMU3DEVd');
```



### getLatestBlock

Get the latest block on the main chain. Returns a `LatestBlock` object.

Usage:
```js
latestBlock = await blockexplorer.getLatestBlock();
```

### getUnconfirmedTx

Get a list of currently unconfirmed transactions. Returns an array of `Transaction` objects.

Usage:
```js
txs = await blockexplorer.getUncomfirmedTx()
```

### getBlocks

Get a list of blocks for a specific day. Returns an array of `SimpleBlock` objects.

Params:

* `time` - unix time in ms (optional) ()

Usage:
```js
blocks = await blockexplorer.getBlocks(1614259228517);
```

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
