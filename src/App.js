import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes,  } from 'react-router-dom'
import {useEffect} from 'react';
import Nav from './Components/Nav'
import Posts from './Components/Posts'
import Auth from './Components/Auth'

function App() {
  const [login, setLogin] = useState(true);


  const switch_form = () =>{
    setLogin(!login);
  }
  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(token !== null){

    }else{
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
      <Nav />
      <Router>
        <Routes>
          <Route path = '/' element={<Auth />} />
          <Route path='/author/posts' element={<Posts />}/>
        </Routes>
      </Router>



    </div>
  );
}

export default App;
