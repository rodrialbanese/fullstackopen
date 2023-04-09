import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

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
    const loggedUserJSON =  window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])


  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser') 
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification("normal", `${user.name} logged in`)
    }
    catch (error) {
      setNotification("error", error.response.data.error)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      console.log('adding blog', title, author, url)
      const newBlog = await blogService.create({title: title, author: author, url:url})
      setBlogs(prevBlogs=>prevBlogs.concat(newBlog))
      setNotification("normal", `a new blog ${newBlog.title} by ${newBlog.author} added`)

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

  const blogList = () => {
    return (
    <div>
       <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )}

  const intro = () => {
    return (
    <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
    </div>      
  )}


  const addBlogForm = () => {
    return (
      <form onSubmit={handleAddBlog}>
      <h2>add blog</h2>
      <div>
        title
          <input
          type="text"
          value={title}
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">add new blog</button>
    </form>
  )}

  return(
  <div>
    <Notification message={successNotification}/>
    <Error message={errorNotification}/>
    {!user && loginForm()}
    {user && intro()} 
    {user && addBlogForm()} 
    {user && blogList()} 

  </div>
  )
  

  
}

export default App