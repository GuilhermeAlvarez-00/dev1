test("GET to /api/v1/status should return 200", async () => {
	const response = await fetch("http://localhost:3000/api/v1/status");

	expect(response.status).toBe(200);

	const body = await response.json();

	expect(body.updated_at).toBeDefined();

	const parsedUpdateAt = new Date(body.updated_at).toISOString();

	expect(body.updated_at).toEqual(parsedUpdateAt);
});

test("GET to /api/v1/status should return correct postgres version", async () => {
	const response = await fetch("http://localhost:3000/api/v1/status");

	expect(response.status).toBe(200);

	const body = await response.json();

	expect(body.database.version).toBeDefined();

	expect(body.database.version).toMatch(
		"PostgreSQL 16.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit",
	);
});

test("GET to /api/v1/status should return max connections", async () => {
	const response = await fetch("http://localhost:3000/api/v1/status");

	expect(response.status).toBe(200);

	const body = await response.json();

	expect(body.database.max_connections).toBe(100);
});

test("GET to /api/v1/status should return connections used", async () => {
	const response = await fetch("http://localhost:3000/api/v1/status");

	expect(response.status).toBe(200);

	const body = await response.json();

	expect(body.database.connections_used).toBeGreaterThan(1);
});
