import {React,useState} from 'react'
import Login from './Login';


function Auth() {
  const [userAuth, setUserAuth] = useState(false);
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
        setUserAuth(true);
        localStorage.setItem('token',valid.token)

      }

    } catch (error) {
      console.error("login submit Error: ",error);
      
    }
  }
  
  return (
    <div>
      <Login loginSubmit={loginSubmit} loginData={loginData} />

    </div>
  )
}

export default Auth