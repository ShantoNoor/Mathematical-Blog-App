import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom'
import BlogsAdd from './pages/Blogs/Add/BlogsAdd.page';
import Blogs from './pages/Blogs.page'
import BlogsDetail from './pages/BlogsDetail.page';
import NotFound from './pages/NotFound.page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/blogs" />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/add' element={<BlogsAdd />} />
      <Route path='/blogs/:id' element={<BlogsDetail />} />
      <Route path='*' element={<NotFound title='Page' />} />
    </Routes>
  );
}

export default App;
