import './App.css';
import {useState,} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useEffect} from 'react';
import Nav from './Components/Nav'
import Posts from './Components/Posts'
import Auth from './Components/Auth'
import CreatePost from './Components/CreatePost'
import UpdateDeletePost from './Components/UpdateDeletePost';
import PageNotFound from './Components/PageNotFound';

function App() {
  const navigate = useNavigate();
  const[userAuth , setUserAuth] = useState(false);

  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(token===null){
      setUserAuth(false);
      navigate('/')
    }
    if(token!==null){
      const expiredate = localStorage.getItem('expires');
      if(expiredate>Date.now()){
        setUserAuth(true);
        navigate('/author/posts',{replace:true})
      }else{
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
        setUserAuth(false);
        navigate('/')
      }
    }
  },[userAuth])

  return (
    <div className="App">
      {/* <Router> */}
      <Nav userAuth={userAuth} />
        <Routes>
          <Route path='*'  element={<PageNotFound />} />
          <Route path = '/' element={<Auth userAuth={userAuth} setUserAuth={setUserAuth}/>} />
          <Route path='/author/posts' element={<Posts userAuth={userAuth} />}/>
          <Route path = '/author/posts/:id' element={<UpdateDeletePost />} />
          <Route path='/author/create-post' element={<CreatePost userAuth={userAuth} />}/>
        </Routes>
      {/* </Router> */}



    </div>
  );
}

export default App;
