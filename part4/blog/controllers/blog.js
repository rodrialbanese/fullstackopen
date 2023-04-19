const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const blog = new Blog(request.body)
	const user = request.user

	if (!user) {
		return response.status(401).json({ error: "unauthorized" })
	}

	blog.user = user.id
	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	const requestUser = request.user

	if (!requestUser) {
		return response.status(401).json({ error: "token not provided" })
	}

	if (!(blog.user.toString() === requestUser.id.toString())) {
		return response.status(401).json({ error: "not valid user" })
	}

	await blog.remove()
	response.status(204).send()
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body

	const requestUser = request.user

	if (!requestUser) {
		return response.status(401).json({ error: "token not provided" })
	}

	const blog = await Blog.findById(request.params.id)
	// any user can like while logged in
	// if (!(blog.user.toString() === requestUser.id.toString())) {
	// 	return response.status(401).json({ error: "not valid user" })
	// }

	blog.likes = body.likes

	const updatedBlog = await blog.save()
	response.status(204).json(updatedBlog)
})

module.exports = blogsRouter
