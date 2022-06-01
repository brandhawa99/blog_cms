import {React, useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid';
export default function UpdateDeletePost() {
  const params = useParams();
  const navigate = useNavigate();
  const [change, setChange] = useState(0)
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
    const data = await fetch(`http://localhost:3001/author/posts/${params.id}`,{
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

  const delete_post = async() =>{
    const data = await fetch(`http://localhost:3001/author/posts/${params.id}/delete`,{
      method:"POST",
      mode:'cors',
      headers:{
        Authorization: localStorage.getItem('token')
      }
    })
    navigate('/author/posts')
  }     

  const submit_Form = async() =>{
    try {

      const response = fetch('http://localhost:3001/author/posts/update',{
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

        }),
      });
      
      if(response.ok){

      }
      
    } catch (error) {
      
    }
  }

  const delete_comment = async(e, id) =>{

    const response = fetch(`http://localhost:3001/author/comment/${id}/delete`,{
      method: "POST",
      mode: 'cors',
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json',
        'Authorization' :localStorage.getItem('token'),
      },
    });
    setChange(change+1)
  }

  useEffect(()=>{

    getPost();
  },[change])

  return (
    <div>
      <form>
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
      <button onClick={submit_Form}>Update</button>
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
        <button onClick={delete_post}>Yes I want to delete it </button>
      </div>
    }
    {
      comments.length>0&&
      comments.map(com =>{
        return <div key={uuid()}> 
          <div> 
            <div>username: {com.name}</div>
            <div>message: {com.message}</div>
            <div>{com.timestamp}</div>
          </div>
          <button onClick={(e)=>delete_comment(e,com._id)}>delete</button>
        </div>
      })
    }
    </div>
  )
}
