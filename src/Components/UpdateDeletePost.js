import {React, useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid';
require('../styles/CreatePost.css')
export default function UpdateDeletePost() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDelete, setDelete] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [comments, setComments] = useState([])
  const [formData, setFormData] = useState({
    title:"",
    blog:"",
    public:false,
  })

  const handleLogin = (e)=>{
    e.preventDefault();
    const newdata = {...formData};
    if(e.target.name !== 'puclic'){
      newdata[e.target.name] = e.target.value;
      setFormData(newdata);
    }
  }
  const handleOnChange = () => {
    const newdata = {...formData}
    newdata["public"] = !isChecked
    setFormData(newdata)
    setIsChecked(!isChecked);
  };


  const getPost = async() =>{
    const idToken = localStorage.getItem('token');
    const data = await fetch(`https://agile-mesa-41864.herokuapp.com/author/posts/${params.id}`,{
      method: 'GET',
      mode:'cors',
      headers:{
        'Authorization' : idToken, 

      }
    })
    const postData = await data.json()
    setFormData(postData.post)
    setIsChecked(postData.post.public);
    setComments(postData.comment)

  }

  const delete_post = async(e) =>{
    e.preventDefault();
    const data = await fetch(`https://agile-mesa-41864.herokuapp.com/author/posts/${params.id}/delete`,{
      method:"POST",
      mode:'cors',
      headers:{
        Authorization: localStorage.getItem('token')
      }
    })
    navigate(`/author/posts`)
  }     

  const submit_Form = async(e) =>{
    e.preventDefault()
    try {

      const response = fetch('https://agile-mesa-41864.herokuapp.com/author/posts/update',{
        method : 'POST',
        mode: 'cors',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
          'Authorization': localStorage.getItem('token'),
        },
        body:JSON.stringify({
          author:formData.author,
          title:formData.title,
          blog:formData.blog,
          timestamp: formData.timestamp,
          public:isChecked,
          id:formData._id,

        })
      });
    } catch (error) {
    }
    navigate('/author/posts')
  }

  const delete_comment = async(id) =>{
    const response = fetch(`https://agile-mesa-41864.herokuapp.com/author/comment/${id}/delete`,{
      method: "POST",
      mode: 'cors',
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json',
        'Authorization' :localStorage.getItem('token'),
      },
    });
  }
  useEffect(()=>{

    getPost();
  },[])

  return (
    <div>
      <form onSubmit={submit_Form}>
      <div>
        <label>Public</label>
        <input name='public' 
                type='checkbox' 
                value='public'
                checked={isChecked}
                onChange={handleOnChange}

        ></input>
      </div>
      <input  type='text' placeholder='Title' name='title' value={formData.title} onChange={(e)=>handleLogin(e)}/>
      <textarea type='textarea' placeholder='post' name='blog' value={formData.blog} onChange={(e)=>handleLogin(e)}/>
      <button type='submit'>Update</button>
      <hr></hr>
    </form>
    {
      !isDelete&&
      <button style={{marginBottom:"10px"}} onClick={()=>{setDelete(!isDelete)}}>Delete</button>
    }
    {isDelete &&
      <div style={{marginBottom:"7px"}}> 
        Are you sure you want to delete this Post
        <button onClick={()=>setDelete(!isDelete)}>Cancel</button>
        <br/>
        <form onSubmit={delete_post}>
         <button type='submit'>Yes I want to delete it </button>
        </form>
      </div>
    }
    {
      comments.length>0&&
      comments.map(com =>{
        return <div key={uuid()} className='delete-comment'> 
          <div className='data'> 
            <div>username: {com.name}</div>
            <div>message: {com.message}</div>
            <div className='time'>{com.timestamp}</div>
          </div>
          <form onSubmit={delete_comment(com._id)}>
            <button className='button-delete'>delete</button>
          </form>
        </div>
      })
    }
    </div>
  )
}
