import React from 'react'

export default function CreatePost() {
  return (
    <div>
      <form>
        <div>
        <label>Private</label>
        <input name='private' type='checkbox'></input>
        </div>
        <input type='text' placeholder='Title' name='title'/ >
        <textarea type='textarea' placeholder='post' name='post'/ >
        <button>Post</button>
      </form>
    </div>
  )
}
