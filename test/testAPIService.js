module.exports = {
	helloWorld: helloWorld,
};

function helloWorld(req, res) {
	const fs = require('fs')
	try {
		var data = req.body.content;
		var h2m = require('h2m')
		var md = h2m(data, {
			overides: {
				li: function (node) {
					if (node.md) {
						return ` • ${node.md}\n`
					}
				},
				s: function (node) {
					if (node.md) {
						return `~~${node.md}~~`
					}
				}
			}
		})
		md = md.replace(/\\t(?!•)(.+\n)/g, "   $1")
		md = md.replace(/\n\\t/g, '')
		md = md.replace(/\n\n/g, '\n')
		md = md.replace(/\\t/g, '')
		md = md.replace(/ +•/g, " •")
		md = md.replace(/\!\[(.+?)\]\(https\:\/\/statics\.teams\.cdn\.office\.net\/evergreen\-assets\/skype\/v2\/[a-zA-Z\-_]+\/20\.png\)/g, "$1")
		res.send(md);
	} catch (err) {
		console.error(err)
	}
}

function sendBack(req, res) {
	res.send(req.body.toto);
}