import database from "infra/database.js";

async function status(req, res) {
	const updateAt = new Date().toISOString();

	const postgresVersionQuery = await database.query("SELECT version()");
	const postgresVersion = postgresVersionQuery?.rows[0]?.version;

	const postgresMaxConnectionQuery = await database.query(
		"SELECT * FROM pg_settings WHERE name = 'max_connections'",
	);
	const postgresMaxConnections = postgresMaxConnectionQuery?.rows[0]?.setting;

	const postgresConnectionsInUseQuery = await database.query(
		"SELECT count(*) as total_connections FROM pg_stat_activity",
	);
	const postgresConnectionsUsed =
		postgresConnectionsInUseQuery?.rows[0]?.total_connections;
	console.log("postgresConnectionsInUseQuery", postgresConnectionsInUseQuery);

	res.status(200).json({
		updated_at: updateAt,
		database: {
			version: postgresVersion,
			max_connections: Number(postgresMaxConnections),
			connections_used: Number(postgresConnectionsUsed),
		},
	});
}

export default status;
