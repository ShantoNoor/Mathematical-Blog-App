import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom'
import BlogsAdd from './pages/Blogs/Add/BlogsAdd.page';
import Blogs from './pages/Blogs.page'
import BlogsDetail from './pages/BlogsDetail.page';
import NotFound from './pages/NotFound.page';
import Login from './pages/Login.page'
import Signup from './pages/Signup.page'
import MyProfile from './pages/MyProfile.page';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Navigate to="/blogs" />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/me' element={<Blogs me />} />
      <Route path='/blogs/add' element={<BlogsAdd />} />
      <Route path='/blogs/:id/my_blog' element={<BlogsDetail my_blog />} />
      <Route path='/blogs/:id' element={<BlogsDetail />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/me' element={<MyProfile />} />
      <Route path='*' element={<NotFound title='Page' />} />
    </Routes>
  );
}

export default App;
