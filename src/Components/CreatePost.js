import React, { useState } from 'react'

function CreatePost(props) {
  const [formData, setFormData] = useState({
    title:"",
    blog:"",
    private:false,
  })
  const handleLogin = (e)=>{
    e.preventDefault();
    const newdata = {...formData};
    newdata[e.target.name] = e.target.value;
    setFormData(newdata);
  }

  const submit_Form = async() =>{
    try {

      const response = fetch('http://localhost:3001/author/post/create',{
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



  return (
  <div>
    {
      props.userAuth ?
      <form>
      <div>
        <label>Private</label>
        <input name='private' type='checkbox'></input>
      </div>
      <input type='text' placeholder='Title' name='title' />
      <textarea type='textarea' placeholder='post' name='post'/>
      <button onClick={submit_Form}>Post</button>
    </form>:<div> LOGIN</div>
    }
  </div>
  )
}

export default CreatePost

