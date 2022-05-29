import {React, useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
export default function UpdateDeletePost() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDelete, setDelete] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
    setFormData(postData.post)
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
        body:JSON.stringify({formData}),
      });
      if(response.ok){

      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{

    getPost();
  },[])

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
      <button onClick={submit_Form}>Post</button>
    </form>
    {
      !isDelete&&
      <button onClick={()=>{setDelete(!isDelete)}}>Delete</button>
    }
    {isDelete &&
      <div> 
        Are you sure you want to delete this Post
        <button onClick={()=>setDelete(!isDelete)}>Cancel</button>
        <br/>
        <button onClick={delete_post}>Yes I want to delete it </button>
      </div>
    }
    </div>
  )
}
