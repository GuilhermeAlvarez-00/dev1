import { Client } from "pg";

async function query(queryObj) {
	const client = new Client({
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		ssl: process.env.NODE_ENV === "development" ? false : true,
	});
	console.log("Postgres credentials: ", {
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
	});

	try {
		await client.connect();

		const result = await client.query(queryObj);

		await client.end();

		return result;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await client.end();
	}
}

export default {
	query: query,
};
