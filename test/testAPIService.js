module.exports = {
	helloWorld: helloWorld,
};

function helloWorld(req, res) {
	res.send("Hello World OAuth2!");
}

function sendBack(req, res) {
	res.send(req.body.toto);
}