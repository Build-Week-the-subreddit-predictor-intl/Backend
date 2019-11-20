const request = require("supertest");
const server = require("../../../api/server");

// register
describe("1", () => {
	it("can login with correct credentials", async () => {
		try {
			user = { username: "melqui", password: "melqui" };
			await request(server)
				.post("/api/auth/register")
				.send(user)
				.expect(201)
				.expect({ id: 1, username: "melqui" });
			await request(server)
				.post("/api/auth/login")
				.send(user)
				.expect(200);
		} catch (error) {
			console.error(
				"Error while testing [POST] /api/auth/login",
				
			);
		}
	});
});

describe("2", () => {
	test("2", () => {
		return request(server)
			.post("/api/auth/register")
			.send({ username: "test" })
			.expect(400)
			.expect({
				file: "authRouter",
				url: "/register",
				method: "POST",
				status: 400,
				message: "Missing required fields!",
				protocol: "http"
			});
	});
});

//login

describe("3", () => {
	test("3", () => {
		return request(server)
			.post("/api/auth/login")
			.send({ username: "melqui", password: "melqui" })
			// .expect();
		// // .expect({ message: "" });
	});
});

describe("4", () => {
	test("4", () => {
		return request(server)
			.post("/api/auth/login")
			.send({ username: "melqui"})
			.expect({
				file: "authRouter",
				url: "/login",
				method: "POST",
				status: 400,
				message: "Missing required fields!",
				protocol: "http"
			});

	});
});
