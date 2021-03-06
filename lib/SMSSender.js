var request = require('request'),
	order = require('../model/OrderModel'),
	log = require('./log');

exports.send = function(message) {
	request({
		url: 'http://yunpian.com/v1/sms/tpl_send.json',
		method: 'post',
		form: {apikey:'', 
			mobile:message.mobile, tpl_id:'', tpl_value:message.content}
		},
		function(err, response, body) {
			var reply;
			if (err) {
				reply = 'network error.';
			} else {
				reply = body;
			}
			order.addSMSState({reply: reply, id: message.orderId}, function(error, rows) {
				if (error) {
					log.error(error);
				}
			});
		}
	);
};
