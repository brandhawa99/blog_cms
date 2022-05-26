import {React, useState, useEffect} from 'react'

export default function Posts(props) {
  const [postData, setPostsData] = useState(undefined);

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
      const data = await response.json();
      console.log(data);
      setPostsData(JSON.parse(JSON.stringify(data)));
      
    } catch (error) {
      console.log(error);
      console.log("THERE WAS AN ERROR");
      
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
