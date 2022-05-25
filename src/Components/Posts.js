import React from 'react'

export default function Posts() {

  const getProtectedRoute = async() =>{
    const idToken = localStorage.getItem('token');
    try{
      const response = await fetch('http://localhost:3001/author/posts',{
        method:"GET",
        headers:{
          "Authorization" : idToken
        },
  
      })
      if(!response.ok){
        throw new Error("You are not authorized")
      }
      const data = response.json();
      console.log(data);
    }catch(err){
      console.err('thee was an erro', err);

    }

  }



  return (
    <div>This is an authorized route</div>
  )
}
