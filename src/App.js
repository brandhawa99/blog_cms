import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes,  } from 'react-router-dom'
import {useEffect} from 'react';
import Nav from './Components/Nav'
import Posts from './Components/Posts'
import Auth from './Components/Auth'
import CreatePost from './Components/CreatePost'

function App() {
  const[userAuth , setUserAuth] = useState(false);

  useEffect(() =>{
    const token = localStorage.getItem('token')
    console.log(token);
    if(token===null){
      setUserAuth(false);
    }
    if(token!==null){
      const expiredate = localStorage.getItem('expires');
      if(expiredate>Date.now()){
        setUserAuth(true);
      }else{
        setUserAuth(false);
      }
    }
  },[])



  // const signupForm = () =>{
  //   return (
  //     <div>
  //       <form action='http://localhost:3001/auth/signup' method='POST'>
  //         <label>First Name</label>
  //         <input type='text' name="first_name" placeholder='First Name'/>
  //         <label>Last Name</label>
  //         <input type='text' name="last_name" />
  //         <label>username</label>
  //         <input type='text' name="username" />
  //         <label>password</label>
  //         <input type='password' name="password"/>
  //         <label>confirm password</label>
  //         <input type='password' name="password2" />
  //         <button type='submit'>Sign Up</button>

  //       </form>
  //     </div>
  //   )
  // }


  return (
    <div className="App">
      <Router>
      <Nav userAuth={userAuth} />
        <Routes>
          <Route path = '/' element={<Auth userAuth={userAuth} setUserAuth={setUserAuth}/>} />
          <Route path='/author/posts' element={<Posts userAuth={userAuth} />}/>
          <Route path='/author/create-post' element={<CreatePost userAuth={userAuth} />}/>
        </Routes>
      </Router>



    </div>
  );
}

export default App;
