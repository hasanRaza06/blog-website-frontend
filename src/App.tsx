import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import BlogsFinal from './pages/BlogsFinal'
import PersonalPosts from './pages/PersonalPosts'
import CreateBlog from './pages/CreateBlog'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<BlogsFinal/>} />
          <Route path="/myblogs" element={<PersonalPosts/>} />
          <Route path="/create" element={<CreateBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App