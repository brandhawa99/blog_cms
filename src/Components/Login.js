import React from 'react'

export default function Login(props) {
  return (
    <div>
      <form>
          <label>username</label>
          <input type='text' name="username" value={props.loginData.username} onChange={(e) => props.handleLogin(e)}/>
          <label>password</label>
          <input type='password' name="password" value={props.loginData.password} onChange={(e) => props.handleLogin(e)}/>
          <button onClick={props.loginSubmit}>Login</button>
       </form>
    </div>
  )
}
