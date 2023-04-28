import PropTypes from "prop-types"
import Blog from "./Blog"
import ToggableBlog from "./ToggableBlog"

const BlogList = ({ blogs, handleLike, handleDelete }) => {
    return (
        <div>
            <div>
                {blogs.map(blog =>
                    <ToggableBlog className="toggable-test" key={blog.id} blogLabel={blog.title + " - " + blog.author}>
                        <Blog className="blog-test" key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
                    </ToggableBlog>
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

