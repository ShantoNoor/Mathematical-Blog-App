import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom'
import PostsAdd from './pages/Posts/Add/PostsAdd.page';
import Posts from './pages/Posts.page'
import PostsDetail from './pages/PostsDetail.page';
import NotFound from './pages/NotFound.page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/posts" />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/posts/add' element={<PostsAdd />} />
      <Route path='/posts/:id' element={<PostsDetail />} />
      <Route path='*' element={<NotFound title='Page' />} />
    </Routes>
  );
}

export default App;
