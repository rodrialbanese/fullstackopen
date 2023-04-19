import { useState, useEffect, useRef } from "react"
import Error from "./components/Error"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Toggable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"
import BlogList from "./components/BlogList"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [successNotification, setSuccessNotification] = useState(null)
    const [errorNotification, setErrorNotification] = useState(null)

    const toggableRef = useRef()

    const setNotification = (type, message) => {
        if (type==="normal") {
            setSuccessNotification(message)
            setTimeout(() => {
                setSuccessNotification(null)
            }, 5000)}
        else if (type==="error") {
            setErrorNotification(message)
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)}
    }


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON =  window.localStorage.getItem("loggedBlogappUser")

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])


    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        window.localStorage.removeItem("loggedBlogappUser")
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log("logging in with", username, password)
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            setNotification("normal", `${user.name} logged in`)
        }
        catch (error) {
            setNotification("error", error.response.data.error)
        }
    }

    const handleAddBlog = async ({ title, author, url }) => {
        try {
            toggableRef.current.toggleVisibility()
            console.log("adding blog", title, author, url)
            const newBlog = await blogService.create({ title: title, author: author, url:url })
            console.log(newBlog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)

            setNotification("normal", `a new blog ${newBlog.title} by ${newBlog.author} added`)

        }
        catch (error) {
            setNotification("error", error.response.data.error)
        }
    }

    const handleLike = async (blog) => {
        try {
            await blogService.modify({ ...blog, likes:blog.likes + 1, user:blog.user.id })
            setBlogs(prev => prev.map(b => b.id === blog.id? { ...blog, likes:blog.likes + 1 }: b ))
        }
        catch (error) {
            setNotification("error", error.response.data.error)
        }
    }

    const handleDelete = async (blog) => {
        try {
            console.log("blog a borrar", blog)
            const updatedBlog = await blogService.remove(blog)
            console.log("deleted", updatedBlog, "despues")
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        catch (error) {
            setNotification("error", error.response.data.error)
        }
    }

    const loginForm = () => {
        return(
            <form onSubmit={handleLogin}>
                <div>
        username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
        password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>)
    }

    const intro = () => {
        return (
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
        )}

    const sortedBlogs = (listOfBlogs) => {
        return listOfBlogs.sort((a, b) => (a.likes > b.likes) ? -1: 1)
    }

    return(
        <div>
            <Notification message={successNotification}/>
            <Error message={errorNotification}/>
            {!user && loginForm()}
            {user && intro()}
            {user && <Togglable buttonLabel="Add Blog" ref={toggableRef}><BlogForm createBlog={handleAddBlog}/></Togglable>}
            {user && <BlogList blogs={sortedBlogs(blogs)} handleLike={handleLike} handleDelete={handleDelete}/>}

        </div>
    )
}

export default App