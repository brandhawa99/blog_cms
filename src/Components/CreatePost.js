import React, { useState } from 'react'
import{Navigate} from 'react-router-dom';
require('../styles/CreatePost.css')
function CreatePost(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    title:"",
    blog:"",
    public:false,
  })

  const handleOnChange = () => {
    const newdata = {...formData}
    newdata["public"] = !isChecked
    setFormData(newdata)
    setIsChecked(!isChecked);
  };


  const handleLogin = (e)=>{
    e.preventDefault();
    const newdata = {...formData};
    if(e.target.name !== 'puclic'){
      newdata[e.target.name] = e.target.value;
      setFormData(newdata);
    }
  }
  const submit_Form = async(e) =>{
    e.preventDefault();
    try {
      const response = fetch('https://agile-mesa-41864.herokuapp.com/author/posts/create',{
        method : 'POST',
        mode: 'cors',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
          'Authorization': localStorage.getItem('token'),
        },
        body:JSON.stringify({
          title:formData.title,
          blog:formData.blog,
          public:formData.public
        }),
      });
      if(response.ok){
        <Navigate to='/author/posts' />
      }
      
    } catch (error) {
      
    }
  }

  return (
  <div className='create-container'>
    {
      props.userAuth ?
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
        <textarea className='text-area' type='textarea' placeholder='post' name='blog' value={formData.blog} onChange={(e)=>handleLogin(e)}/>
        <button onClick={(e)=>submit_Form(e)}>Post</button>
      </form>
    </div>:<div> LOGIN</div>
    }
  </div>
  )
}

export default CreatePost

