const _ = require("lodash")
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1
}

const totalLikes  = (blogs) => {
	return blogs.reduce((likes, blog) => {
		return likes + blog.likes
	}, 0)
}

const favouriteBlog = (blogs) => {
	return blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev)
}

const mostblogs = (blogs) => {
	const blogsByAuthor = _.groupBy(blogs, "author")
	const authorCounts = _.mapValues(blogsByAuthor, (blogs) => blogs.length)
	const authorMax = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])
	const bb = {
		"author": authorMax,
		"blogs": authorCounts[authorMax]
	}
	console.log(bb)
	return bb
}

const mostLikes = (blogs) => {
	const blogsByAuthor = _.groupBy(blogs, "author")
	const likesByAuthor = _.mapValues(blogsByAuthor, (blogs) => _.sumBy(blogs, "likes"))
	const authorMax = _.maxBy(_.keys(likesByAuthor), (author) => likesByAuthor[author])
	const bb = {
		"author": authorMax,
		"likes": likesByAuthor[authorMax]
	}
	return bb
}


module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostblogs,
	mostLikes
}

