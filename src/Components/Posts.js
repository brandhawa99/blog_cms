import {React, useState, useEffect} from 'react'
import Post from './Post'
import {v4 as uuid} from 'uuid';
import { useNavigate } from 'react-router-dom';
import '../styles/Post.css'

export default function Posts(props) {
  const navigate = useNavigate();
  
  const [postData, setPostsData] = useState(undefined);
  const [errors, setErrors] = useState(false);

  const data =async() =>{

    try {
      const idToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/author/posts',{
        method: 'GET',
        mode:'cors',
        headers:{
          'Authorization' : idToken, 

        }
      });

      if(response.ok){

        let data = await response.json();
        //get the array from the object
        data = data.posts;
        setPostsData(JSON.parse(JSON.stringify(data)));

      }else{
        throw new Error('The response was not okay')
      }
      
    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() =>{
    data();
  },[])


  return (
    <div className='main-container'>

      {postData?.map(post =>{
        return(
          <div key={uuid()}className={`post-container ${post.public?'green':'red'}`}onClick={()=>{navigate('/author/posts/'+post._id)}}>    
          <Post key={post._id} title={post.title} blog={post.blog} public={post.public} timestamp={post.timestamp} />
          </div>
        )  


      })}
    </div>
  )
}
