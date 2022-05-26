import React from 'react'

function CreatePost(props) {
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
      <button>Post</button>
    </form>:<div> LOGIN</div>
    }
  </div>
  )
}

export default CreatePost

