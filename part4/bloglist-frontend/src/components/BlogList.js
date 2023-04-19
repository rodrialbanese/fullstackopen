import PropTypes from "prop-types"
import Blog from "./Blog"
import TogglableBlog from "./ToggableBlog"

const BlogList = ({ blogs, handleLike, handleDelete }) => {
    console.log(blogs)
    return (
        <div>
            <div>
                {blogs.map(blog =>
                    <TogglableBlog  key={blog.id} blogLabel={blog.title + " - " + blog.author}>
                        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
                    </TogglableBlog>
                )}

            </div>
        </div>
    )}

BlogList.prototype = {
    blogs: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default BlogList

