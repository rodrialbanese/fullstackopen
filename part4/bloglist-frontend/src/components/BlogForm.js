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
                    type="text"
                    value={title}
                    name="Username"
                    onChange={({ target }) => setNewTitle(target.value)}
                />
            </div>
            <div>
      author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
            </div>
            <div>
      url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setNewUrl(target.value)}
                />
            </div>
            <button type="submit">add new blog</button>
        </form>
    )
}

export default BlogForm

