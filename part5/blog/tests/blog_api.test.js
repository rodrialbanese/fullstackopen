const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./api_helper")

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	await helper.createUser()
	await Blog.insertMany(await helper.blogsWithUser())
})

describe("when there are some blogs created", () => {
	test("api response contains all blogs", async () => {
		const response = await api.get("/api/blogs")
		expect(response.body).toHaveLength(3)
	})

	test("blog post unique identifier is id and not _id", async () => {
		const response = await api.get("/api/blogs")
		expect(response.body[0].id).toBeDefined()
		expect(response.body[0]._id).not.toBeDefined()
	})
})

describe("addition of new blog", () => {
	test("new blog can be created", async () => {
		const login = await api
			.post("/api/login")
			.send({ username: "root", password: "sekret" })

		const newBlog = {
			title: "New Blog",
			author: "String",
			url: "www.string.com",
			likes: 55
		}

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
		const content = blogsAfter.map(blog => blog.title)
		expect(content).toContainEqual("New Blog")
	})
	test("new blog can't be created without token", async () => {
		const newBlog = {
			title: "New Blog",
			author: "String",
			url: "www.string.com",
			likes: 55
		}

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(401)
			.expect("Content-Type", /application\/json/)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
	})

	test("check blogs without likes default to 0", async () => {
		const login = await api
			.post("/api/login")
			.send({ username: "root", password: "sekret" })

		const newBlog = {
			title: "New Blog",
			author: "String",
			url: "www.string.com"
		}
		const test = await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
		expect(test.body.likes).toBeDefined()
		expect(test.body.likes).toBe(0)
	})

	test("check blogs without title cannot be added", async () => {
		const login = await api
			.post("/api/login")
			.send({ username: "root", password: "sekret" })

		const newBlog = {
			author: "String",
			url: "www.string.com",
			likes: 10
		}
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(400)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
	})

	test("check blogs without url cannot be added", async () => {
		const login = await api
			.post("/api/login")
			.send({ username: "root", password: "sekret" })

		const newBlog = {
			title: "Test Title",
			author: "String",
			likes: 10
		}
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(400)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
	})
})

describe("modification of blogs", () => {
	test("blog can be deleted", async () => {
		const login = await api
			.post("/api/login")
			.send({ username: "root", password: "sekret" })

		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `Bearer ${login.body.token}`)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)
	})

	test("blog can be updated", async () => {
		const login = await api
			.post("/api/login")
			.send({ username: "root", password: "sekret" })

		const likes = 999
		const body = {
			likes: likes
		}
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.set("Authorization", `Bearer ${login.body.token}`)
			.send(body)
			.expect(204)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
		const blogUpdated = blogsAfter.find(blog => blog.id == blogToUpdate.id)
		expect(blogUpdated.likes).toBe(likes)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
