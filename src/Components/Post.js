import React from 'react'

function Post(props) {
  const {title,blog,timestamp} = props

  return (
    <div>
      <h1>{title}</h1>
      <p>{blog}</p>
      <p>{timestamp}</p>
      <p>{props.public}</p>
    </div>
  )
}

export default Post