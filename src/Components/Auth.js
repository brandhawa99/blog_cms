import {React,useState} from 'react'
import Login from './Login';
import '../styles/Auth.css'


function Auth(props) {
  const [loginData, setLoginData] = useState({
    username:"",
    password:"",
  })

  const handleLogin = (e)=>{
    e.preventDefault();
    const newdata = {...loginData};
    newdata[e.target.name] = e.target.value;
    setLoginData(newdata);
  }

  const loginSubmit = async(e) =>{
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:3001/auth/login',{
        method:'POST',
        mode:'cors',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(loginData),
      });
      const valid = await response.json();
      if(response.status === 200){
        props.setUserAuth(true);
        localStorage.setItem('token',valid.token)
        localStorage.setItem('expires', valid.expiresIn)

      }else{
        throw new Error ('Login Error')
      }

    } catch (error) {
      console.error("login submit Error: ",error);
      
    }
  }

  function logOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    props.setUserAuth(false);
  }
  
  return (
    <div className='auth'>
      {!props.userAuth ? 
        <Login userAuth={props.userAuth} loginSubmit={loginSubmit} handleLogin={handleLogin} loginData={loginData} />:
        <div className='loggedIn'><button onClick={logOut}>Log Out!</button></div>
      }

    </div>
  )
}

export default Auth