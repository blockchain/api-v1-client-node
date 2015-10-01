
var request = require('request');
var include = require('./include');
var root = include.root;
var appendToURL = include.appendToURL;
var makeRequest = include.makeRequest;
var satoshi_per_btc = 100000000;
var btc_per_satoshi = 0.00000001;

function MyWallet(guid, pass, pass2, apicode) {

	this.guid = guid;
	this.pass = pass;
	this.pass2 = pass2;
	this.apicode = apicode;

	return this;
}

MyWallet.prototype.send = function(options, callback) {
	var url = root + 'merchant/' + this.guid + '/payment?password=' + this.pass + '&api_code=' + this.apicode;

	if (String(options.inBTC) === 'true' && options.amount !== undefined) {
		options.amount *= satoshi_per_btc;
		options.amount = Math.round(options.amount);
	}
	if (String(options.inBTC) === 'true' && options.fee !== undefined) {
		options.fee = Math.round(options.fee);
		options.fee *= satoshi_per_btc;
	}

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('address', options.to);
	url += appendToURL('amount', options.amount);

	// Optional parameters
	url += appendToURL('from', options.from);
	url += appendToURL('fee', options.fee);
	url += appendToURL('note', options.note);

	request(url, function(error, response, body) {
		callback(error, JSON.parse(body));
	});

	return this;
}

MyWallet.prototype.sendMany = function(options, recipients, callback) {
	var args = arguments.length
	url = root + 'merchant/' + this.guid + '/sendmany?password=' + this.pass + '&api_code=' + this.apicode;

	if (args === 2) {
		callback = addresses;
		addresses = options;
		options = {};
	}

	if (String(options.inBTC) === 'true' && recipients !== undefined) {
		for (var key in recipients) {
			recipients[key] *= satoshi_per_btc;
		}
	}

	var recipientsURI = encodeURIComponent(JSON.stringify(recipients));

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('recipients', recipientsURI);

	// Optional parameters
	url += appendToURL('from', options.from);
	url += appendToURL('fee', options.fee);
	url += appendToURL('note', options.note);

	makeRequest(url, callback);

	return this;
}

MyWallet.prototype.getBalance = function(inBTC, callback) {
	var url = root + 'merchant/' + this.guid + '/balance?password=' + this.pass + '&api_code=' + this.apicode,
	conversion = 1;

	if (arguments.length === 1) {
		callback = inBTC;
		inBTC = false;
	}

	if (String(inBTC) === 'true') conversion = btc_per_satoshi;

	makeRequest(url, function(error, data) {
		if (!error) callback(null, (data.balance * conversion));
		else callback(error);
	});
	return this;
}

MyWallet.prototype.listAddresses = function(callback) {
	var url = root + 'merchant/' + this.guid + '/list?password=' + this.pass;
	makeRequest(url, callback);
	return this;
}

MyWallet.prototype.getAddress = function(address, confirmations, callback) {
	var url = root + 'merchant/' + this.guid + '/address_balance?password=' + this.pass;

	if (arguments.length === 2) {
		callback = confirmations;
		confirmations = 6;
	}

	url += appendToURL('address', address);
	url += appendToURL('confirmations', confirmations);
	makeRequest(url, callback);
	return this;
}

MyWallet.prototype.newAddress = function(label, callback) {

	var url = root + 'merchant/' + this.guid + '/new_address?password=' + this.pass;

	if (arguments.length === 1) {
		callback = label;
		label = undefined;
	}

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('label', label);

	makeRequest(url, callback);

	return this;
}

MyWallet.prototype.archiveAddress = function(address, callback) {

	var url = root + 'merchant/' + this.guid + '/archive_address?password=' + this.pass;

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('address', address);

	makeRequest(url, callback);

	return this;
}

MyWallet.prototype.unarchiveAddress = function(address, callback) {

	var url = root + 'merchant/' + this.guid + '/unarchive_address?password=' + this.pass;

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('address', address);

	makeRequest(url, callback);

	return this;
}

MyWallet.prototype.consolidate = function(days, callback) {

	var url = root + 'merchant/' + this.guid + '/auto_consolidate?password=' + this.pass;

	if (arguments.length === 1) {
		callback = days;
		days = 60;
	}

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('days', days);

	makeRequest(url, callback);

	return this;
}

module.exports = MyWallet;
