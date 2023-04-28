const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const initialBlogs = [
	{
		title: "Titulo 1",
		author: "Sting",
		url: "www.titulo1.com",
		likes: 5
	},
	{
		title: "Titulo 2",
		author: "Edgar Allan",
		url: "www.haha.com",
		likes: 8
	},
	{
		title: "Titulo 3",
		author: "Edgar Allan",
		url: "www.haha.com",
		likes: 1
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

const createUser = async () => {
	const passwordHash = await bcrypt.hash("sekret", 10)
	const user = new User({
		username: "root",
		name: "root",
		passwordHash: passwordHash
	})

	await user.save()
}

const blogsWithUser = async () => {
	const user = await User.findOne({})
	const b = initialBlogs.map(blog => ({ ...blog, user: user.id }))
	return b
}

module.exports = {
	initialBlogs,
	blogsInDb,
	usersInDb,
	createUser,
	blogsWithUser
}
