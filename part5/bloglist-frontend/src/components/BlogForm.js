import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setNewTitle] = useState("")
    const [author, setNewAuthor] = useState("")
    const [url, setNewUrl] = useState("")

    const handleAddBlog = (event) => {
        event.preventDefault()
        createBlog({
            title, author, url
        })
        setNewTitle("")
        setNewAuthor("")
        setNewUrl("")
    }

    return (
        <form onSubmit={handleAddBlog}>
            <h2>add blog</h2>
            <div>
      title
                <input
                    id="test-input-title"
                    type="text"
                    value={title}
                    name="Username"
                    onChange={({ target }) => setNewTitle(target.value)}
                />
            </div>
            <div>
      author
                <input
                    id="test-input-author"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
            </div>
            <div>
      url
                <input
                    id="test-input-url"
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setNewUrl(target.value)}
                />
            </div>
            <button id="test-button-new-blog-form" type="submit">add new blog</button>
        </form>
    )
}

export default BlogForm

