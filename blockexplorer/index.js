var API = require('../api')
var endpoints = require('./endpoints')

module.exports = createWithApi(API.createUsingNetwork(0, endpoints, false))

module.exports.usingNetwork = function (network) {
  return createWithApi(API.createUsingNetwork(network, endpoints, false))
}

module.exports.enableCors = function (corsEnabled) {
  return createWithApi(API.createUsingNetwork(0, endpoints, corsEnabled))
}

function createWithApi (api) {
  return {
    getBlock: getBlock.bind(null, api),
    getTx: getTx.bind(null, api),
    getBlockHeight: getBlockHeight.bind(null, api),
    getAddress: getAddress.bind(null, api),
    getMultiAddress: getMultiAddress.bind(null, api),
    getUnspentOutputs: getUnspentOutputs.bind(null, api),
    getBalance: getBalance.bind(null, api),
    getLatestBlock: getLatestBlock.bind(null, api),
    getUnconfirmedTx: getUnconfirmedTx.bind(null, api),
    getBlocks: getBlocks.bind(null, api)
  }
}

function getBlock (api, blockHash, options) {
  options = options || {}
  return api.request('rawblock', { hash: blockHash, apiCode: options.apiCode })
}

function getTx (api, txHash, options) {
  options = options || {}
  return api.request('rawtx', { hash: txHash, apiCode: options.apiCode })
}

function getBlockHeight (api, blockHeight, options) {
  options = options || {}
  return api.request('blockHeight', { height: blockHeight, apiCode: options.apiCode })
}

function getAddress (api, address, options) {
  options = options || {}
  var params = { address: address, limit: options.limit, offset: options.offset, apiCode: options.apiCode }
  return api.request('address', params)
}

function getMultiAddress (api, addresses, options) {
  options = options || {}
  addresses = (addresses instanceof Array ? addresses : [addresses]).join('|')
  var params = { active: addresses, limit: options.limit, offset: options.offset, apiCode: options.apiCode }
  return api.request('multiaddr', params)
}

function getUnspentOutputs (api, addresses, options) {
  options = options || {}
  addresses = (addresses instanceof Array ? addresses : [addresses]).join('|')
  return api.request('unspent', { active: addresses, confirmations: options.confirmations, limit: options.limit, apiCode: options.apiCode })
}

function getBalance (api, addresses, options) {
  options = options || {}
  addresses = (addresses instanceof Array ? addresses : [addresses]).join('|')
  return api.request('balance', { active: addresses, apiCode: options.apiCode })
}

function getLatestBlock (api, options) {
  options = options || {}
  return api.request('latestblock', options)
}

function getUnconfirmedTx (api, options) {
  options = options || {}
  return api.request('unconfTxs', options)
}

function getBlocks (api, time, options) {
  options = options || {}
  return api.request('blocks', { time: time, apiCode: options.apiCode })
}
