import React from 'react'
require('../styles/Post.css')

function Post(props) {
  const {title,blog,timestamp} = props
  var options = {year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className='post-thing'>
      <h1 className='title'>{title}</h1>
      <p className='post-blog'>{blog}</p>
      <p>{new Date(timestamp).toLocaleTimeString('en-US',options)}</p>
      <p>{props.public}</p>
    </div>
  )
}

export default Post