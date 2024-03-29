const listHelper = require("../utils/list_helper")

const listWithOneBlog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	}
]

const allBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}  
]

test("dummy returns one", () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toEqual(5)
	})

	test("when list has only more than 1 blog, equals the sum of likes of all blogs", () => {
		const result = listHelper.totalLikes(allBlogs)
		expect(result).toBe(36)
	})
})

describe("favourite blog", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.favouriteBlog(listWithOneBlog)
		expect(result).toStrictEqual({
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		})
	})

	test("when list has only more than 1 blog, equals the likes of blogs with most likes", () => {
		const result = listHelper.favouriteBlog(allBlogs)
		expect(result).toStrictEqual({
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		})
	})
})

describe("author with most blogs", () => {
	test("when list has only one blog, equals the author of that blog", () => {
		const result = listHelper.mostblogs(listWithOneBlog)
		expect(result).toStrictEqual({"author": "Edsger W. Dijkstra", blogs: 1})
	})
	test("when list has only more than 1 blog, equals the who have most blogs", () => {
		const result = listHelper.mostblogs(allBlogs)
		expect(result).toStrictEqual({"author": "Robert C. Martin", blogs: 3})
	})
})

describe("author with most likes", () => {
	test("when list has only one blog, equals the author of that blog", () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		expect(result).toStrictEqual({"author": "Edsger W. Dijkstra", likes: 5})
	})
	test("when list has only more than 1 blog, equals the who have most sum of likes", () => {
		const result = listHelper.mostLikes(allBlogs)
		expect(result).toStrictEqual({"author": "Edsger W. Dijkstra", likes: 17})
	})
})


