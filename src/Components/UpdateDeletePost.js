import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
export default function UpdateDeletePost() {
  const params = useParams();
  const [post, setPost] = useState([])


  const getPost = async() =>{
    const idToken = localStorage.getItem('token');
    console.log(params.id);
    const data = await fetch(`http://localhost:3001/author/posts/${params.id}`,{
      method: 'GET',
      mode:'cors',
      headers:{
        'Authorization' : idToken, 

      }
    })
    const postData = await data.json()
    console.log(postData);
    setPost(postData.post)
  }

  const update = async() =>{
    fetch()

  }

  useEffect(()=>{

    getPost();
  },[])

  return (
    <div>
      <form>
        <label>Title</label>
        <input type='text' value={post.title}></input>
        <label>Blog</label>
        <textarea value={post.blog}></textarea>
        <label>Public</label>
        <input type='checkbox' checked={post.public?'checked':''}></input>
        <button>Update</button>
      </form>
    </div>
  )
}
