import React from 'react'

export default function SignUp(props) {
  return (
    <div>
      <form>
          <label>First Name:</label>
          <input type='text' name="first_name" value={props.loginData.first_name} onChange={(e) => props.handleLogin(e)}/>
          <label>Last Name:</label>
          <input type='text' name="last_name" value={props.loginData.last_name} onChange={(e) => props.handleLogin(e)}/>
          <label>username</label>
          <input type='text' name="username" value={props.loginData.username} onChange={(e) => props.handleLogin(e)}/>
          <label>password</label>
          <input type='password' name="password" value={props.loginData.password} onChange={(e) => props.handleLogin(e)}/>
          <label>Comfirm Password</label>
          <input type='password' name="password2" value={props.loginData.password2} onChange={(e) => props.handleLogin(e)}/>
          <button onClick={props.loginSubmit}>Sign Up</button>
       </form>
    </div>
  )
}
