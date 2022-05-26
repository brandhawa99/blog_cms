import {React, useState, useEffect} from 'react'

export default function Posts(props) {
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

      // if(!response.ok){
      //   throw new Error('There was an error')
      // }
      if(response.ok){

        const data = await response.json();
        console.log(data);
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
    <div>
      {props.userAuth ? <div>yes</div>:<div>no</div>}
    </div>
  )
}
