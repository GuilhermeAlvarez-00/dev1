import database from "infra/database.js";

async function status(req, res) {
	const updateAt = new Date().toISOString();

	const databaseVersionQuery = await database.query("SHOW server_version;");
	const databaseVersion = databaseVersionQuery?.rows[0]?.server_version;

	const dabaseMaxConnectionQuery = await database.query("SHOW max_connections");
	const databaseMaxConnections =
		dabaseMaxConnectionQuery?.rows[0]?.max_connections;

	const databaseName = process.env.POSTGRES_DB;
	const databaseConnectionsInUseQuery = await database.query({
		text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
		values: [databaseName],
	});
	const databaseConnectionsUsed = databaseConnectionsInUseQuery?.rows[0]?.count;

	res.status(200).json({
		updated_at: updateAt,
		dependencies: {
			database: {
				version: databaseVersion,
				max_connections: Number(databaseMaxConnections),
				opened_connections: Number(databaseConnectionsUsed),
			},
		},
	});
}

export default status;
