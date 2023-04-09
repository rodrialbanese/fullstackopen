const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const helper = require("./api_helper")
const bcrypt = require("bcryptjs")

const api = supertest(app)

describe("Users tests - 1 user in database", () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("sekret", 10)
		const user = new User({
			username: "root",
			name: "root",
			passwordHash: passwordHash
		})

		await user.save()
	})
	test("user can be created", async () => {
		const usersBefore = await helper.usersInDb()

		const newUser = {
			username: "longenough",
			name: "xxxxxxx",
			password: "longenough"
		}

		await api
			.post("/api/users/")
			.send(newUser)
			.expect(201)

		const usersAfter = await helper.usersInDb()
		expect(usersAfter).toHaveLength(usersBefore.length + 1)
		const namesInUsers = usersAfter.map(user => user.name)
		expect(namesInUsers).toContain(newUser.name)
	})

	test("user can't be created without username", async () => {
		const usersBefore = await helper.usersInDb()

		const newUser = {
			name: "xxxxxxx",
			password: "longenough"
		}

		const result = await api
			.post("/api/users/")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		const usersAfter = await helper.usersInDb()
		expect(usersAfter).toHaveLength(usersBefore.length)

		expect(result.body.error).toContain(
			"User validation failed: username: Path `username` is required."
		)
	})
	test("user can't be created if username less than 3 chars", async () => {
		const usersBefore = await helper.usersInDb()

		const newUser = {
			username: "12",
			name: "xxxxxxx",
			password: "longenough"
		}

		const result = await api
			.post("/api/users/")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		const usersAfter = await helper.usersInDb()
		expect(usersAfter).toHaveLength(usersBefore.length)

		expect(result.body.error).toContain(
			"User validation failed: username: Path `username"
		)
		expect(result.body.error).toContain(
			"is shorter than the minimum allowed length"
		)
	})
	test("user can't be created if password less than 3 chars", async () => {
		const usersBefore = await helper.usersInDb()

		const newUser = {
			username: "longenough",
			name: "xxxxxxx",
			password: "12"
		}

		const result = await api
			.post("/api/users/")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		const usersAfter = await helper.usersInDb()
		expect(usersAfter).toHaveLength(usersBefore.length)

		expect(result.body.error).toContain(
			"password must be at least 3 characters long"
		)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
