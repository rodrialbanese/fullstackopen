import PropTypes from "prop-types"
const Blog = ({ blog, handleLike, handleDelete }) => (

    <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={() => handleDelete(blog)}>Remove</button>

    </div>
)

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default Blog