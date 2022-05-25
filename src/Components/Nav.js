import React from 'react'
import '../styles/Nav.css'
import {Link} from 'react-router-dom';

export default function Nav() {
  const navStyle = {
    color:'black',
    textDecoration: "none",
}
  return (
    <div className='nav'>
      <div className="container">
        {/* <Link style={navStyle} to='/'>
          <div className='title'>Dev Blog</div>
        </Link>
        <Link to='/posts'style={navStyle}>
          <div className='button'>All Posts</div>
        </Link> */}
      </div>
    </div>
  )
}
