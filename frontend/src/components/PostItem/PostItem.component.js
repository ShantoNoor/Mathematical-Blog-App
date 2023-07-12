import { Link } from 'react-router-dom'
import './PostItem.style.scss'

const PostItem = ({post}) => {
  return (
    <div className='post-item'>
        <h2 className='post-item__title'>{post.title}</h2>
        <h3 className='post-item__author'>{post.added_by.first_name} {post.added_by.last_name}</h3>
        <div className='post-item__info'>
          <span className='post-item__likes'>3</span>
          <span className='post-item__views'>{post.views}</span>
          <span className='post-item__rating'>4.3</span>
          <Link to={`/posts/${post.id}`}>Read</Link>
        </div>
    </div>
  )
}

export default PostItem