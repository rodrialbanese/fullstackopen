import { useState } from "react"

const LoginForm = ({ loginFunction }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    loginFunction({ username: userName, password: password })
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
           username
          <input
            value={userName}
            onChange={event => setUserName(event.target.value)}
          />
        </div>
        <div>
           password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">LOG IN</button>
      </form>
    </div>
  )
}

export default LoginForm