import React from 'react'
import Navbar from '../components/Navbar'
import Blogs from '../components/Blog'
import PostBar from '../components/PostBar'

export default function () {
  return (
    <div>
        <Navbar></Navbar>
        <PostBar />
        <Blogs></Blogs>
    </div>
  )
}
