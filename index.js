const app = require('express')()
const basicAuth = require('express-basic-auth')
var bodyParser = require('body-parser')


var customAuthorizerAuth = basicAuth({
	authorizer: myAuthorizer
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/html-to-markdown', customAuthorizerAuth, function(req, res) {
	try {
		console.log(req.body);
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
		res.send(req.body);
	}
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});


//Custom authorizer checking if the username starts with 'A' and the password with 'secret'
function myAuthorizer(username, password) {
	return username.startsWith(process.env.DB_USER) && password.startsWith(process.env.DB_PASSWORD)
}