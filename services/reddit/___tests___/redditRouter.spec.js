const request = require("supertest");
const server = require("../../../api/server");

describe("1", () => {
	test("1", () => {
		return request(server)
			.get("/")
			.expect(200);
	});
});
