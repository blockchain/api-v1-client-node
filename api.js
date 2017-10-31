var request = require('request-promise')
var q = require('q')
var urljoin = require('url-join')

function API (rootUrl, endpoints, corsEnabled = false) {
  this.rootUrl = rootUrl
  this.endpoints = endpoints
  this.corsEnabled = corsEnabled
}

API.prototype.request = function (api, options) {
  try {
    var endpoint = this.endpoints[api].stringify(options)
    var apiurl = urljoin(this.rootUrl, endpoint) + (this.corsEnabled === true ? '&cors=' + this.corsEnabled : '')
    return request(apiurl).then(parseResponse).catch(handleError)
  } catch (err) {
    return q.reject(err)
  }
}

API.prototype.post = function (api, options, body) {
  try {
    var endpoint = this.endpoints[api].stringify(options)
    var apiurl = urljoin(this.rootUrl, endpoint)
    return request({
      method: 'POST',
      url: apiurl,
      form: body
    }).then(parseResponse).catch(handleError)
  } catch (err) {
    return q.reject(err)
  }
}

API.createUsingNetwork = function (network, endpoints, corsEnabled = false) {
  return new API(API.apiUrlForNetwork(network), endpoints, corsEnabled)
}

API.apiUrlForNetwork = function (network) {
  switch (network) {
    case 0:
      return 'https://blockchain.info'
    case 5:
      return 'https://testnet5.blockchain.info'
    default:
      throw new Error('Invalid network: ' + network)
  }
}

module.exports = API

function parseResponse (response) {
  try { return JSON.parse(response) } catch (e) { return response }
}

function handleError (e) {
  throw e.error || e || 'Unexpected error'
}
