const request = require("supertest");
const server = require("../server");

describe("correctly importing server file into index", () => {
	test("[GET] / is functional", () => {
		return request(server)
			.get("/")
			.expect(200)
      .expect({ message: "Server is running" });
  });
});
