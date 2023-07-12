import './App.scss';
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import PostsAdd from './Pages/Posts/Add/PostsAdd.page';
import Posts from './Pages/Posts/Index/Posts.page'
import PostsDetail from './Pages/Posts/Detail/PostsDetail.page';
import NotFound from './Pages/NotFound/NotFound.page';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/posts" />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/add' element={<PostsAdd />} />
        <Route path='/posts/:id' element={<PostsDetail />} />
        <Route path='*' element={<NotFound title='Page' />} />
      </Routes>
    </>
  );
}

export default App;
