import Navbar from '../components/Navbar'
import MyPosts from '../components/MyPosts'
import PostBar from '../components/PostBar'

export default function () {
  return (
    <div>
        <Navbar></Navbar>
        <PostBar/>
        <MyPosts></MyPosts>
    </div>
  )
}
