const request = require("supertest");
const {
	findUsers,
	findUser,
	addUser,
	updateUser,
	removeUser
} = require("../authModel");
const db = require("../../../database/db-config");

let userList = [];
const user = { username: "test", password: "test" };

beforeEach(() => {
	return db("users").truncate();
});

afterEach(() => {
	return db("users").truncate();
});

describe("create user", () => {
	it("should insert user", async () => {
		addUser(user);
		userList = await db("users");
		expect(userList).toHaveLength(1);
	});
});
describe("get all users", () => {
	it("get users", async () => {
		 addUser(user);
		userList = await findUsers();
		expect(userList).toHaveLength(1);
	});
});
describe("get  user", () => {
	it("get user by id", async () => {
		 addUser(user);
		userList = await findUser({ username: "test" });
		expect(userList == "object");
	});
});
describe("update user", () => {
	it("update user", async () => {
		postList = await updateUser({ username: "namee", ...user }, 1);
		expect(postList === "number");
	});
});
describe("deleteuser", () => {
	it("delete user", async () => {
		postList = await removeUser(1);
		expect(typeof postList === "number");
	});
});
