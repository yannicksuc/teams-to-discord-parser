module.exports = {
	query: query,
};

const Pool = require("pg").Pool;

function query(queryString, cbFunc) {
	const pool = new Pool({
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		port: parseInt(process.env.DB_PORT)
	});

	pool.query(queryString, (error, results) => {
		cbFunc(setResponse(error, results));
	});
}

function setResponse(error, results) {
	return {
		error: error,
		results: results ? results : null,
	};
}
