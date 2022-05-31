import {React,useState} from 'react'
import Login from './Login';
import SignUp from './SignUp';
import '../styles/Auth.css'
import { useNavigate } from 'react-router-dom';


function Auth(props) {
  let navigate = useNavigate()
  const [loginForm, setLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({
    username:"",
    password:"",
  })
  const [signupData, setSignupData] = useState({
    first_name:"",
    last_name:"",
    username:"",
    password:"",
    password2:"",
  })

  const handleLogin = (e)=>{
    e.preventDefault();
    const newdata = {...loginData};
    newdata[e.target.name] = e.target.value;
    setLoginData(newdata);
  }
  const handleSignup = (e)=>{
    e.preventDefault();
    const newdata = {...signupData};
    newdata[e.target.name] = e.target.value;
    setSignupData(newdata);
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
        navigate('/author/posts');

      }else{
        throw new Error ('Login Error')
      }

    } catch (error) {
      console.error("login submit Error: ",error);
      
    }
  }
  const signupSubmit = async(e) =>{
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:3001/auth/signup',{
        method:'POST',
        mode:'cors',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          first_name: signupData.first_name,
          last_name: signupData.last_name,
          username:signupData.username,
          password:signupData.password,
          password2: signupData.password2
        }),
      });
      const valid = await response.json();
      if(response.status === 200){
        props.setUserAuth(true);
        localStorage.setItem('token',valid.token)
        localStorage.setItem('expires', valid.expiresIn)

        navigate('/author/create-post')

      }else{
        throw new Error (valid)
      }

    } catch (error) {
      console.error("Signup submit Error: ",error);
      
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
      <div> 
        {
          loginForm?<Login userAuth={props.userAuth} loginSubmit={loginSubmit} handleLogin={handleLogin} loginData={loginData} />:
        <SignUp userAuth={props.userAuth} loginSubmit={signupSubmit} handleLogin={handleSignup} loginData={signupData}/>
        }
        <button onClick={(e)=>{e.preventDefault(); setLoginForm(!loginForm)}}>{loginForm?"Sign Up":"Login"}</button>
      </div>:
        <div className='loggedIn'><button onClick={logOut}>Log Out!</button></div>
      }

    </div>
  )
}

export default Auth