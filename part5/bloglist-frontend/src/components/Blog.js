import PropTypes from "prop-types"
const Blog = ({ blog, handleLike, handleDelete }) => {
    const JSONloggedUser =  window.localStorage.getItem("loggedBlogappUser")

    const removeButton = () => {
        if (JSONloggedUser) {
            const loggedUser = JSON.parse(JSONloggedUser)
            if (loggedUser.username === blog.user.username) {
                return <button onClick={() => handleDelete(blog)}>Remove</button>
            }
        }
        return null
    }

    return (

        <div id="test-blog">
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button id="test-like-button" onClick={() => handleLike(blog)}>like</button></div>
            <div>{blog.user.name}</div>
            {removeButton()}
        </div>
    )}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default Blog