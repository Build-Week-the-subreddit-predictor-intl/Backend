const request = require("supertest");
const server = require("../../../api/server");

describe("1", () => {
	test("1", () => {
		return request(server)
			.get("/api/posts")
			.expect(200);
	});
});

/*
get /api/posts
get /api/posts/:id
post /api/posts/
post /api/posts/reddit
put /api/posts/:id
delete /api/posts/:id

*/