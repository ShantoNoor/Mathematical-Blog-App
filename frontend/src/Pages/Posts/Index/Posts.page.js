import React, { useEffect, useState } from 'react'
import './Posts.style.scss'
import PostItem from '../../../components/PostItem/PostItem.component'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => {
				if(response.statusText === 'OK')
					return response.json()
				return []
			})
      .then(posts => {
				if(posts !== []) {
          setPosts(posts)
          // console.log(posts)
				}
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <section className='posts'>
      <h1 className='posts__title'>Posts</h1>
      <div className='posts__container'>
        {posts.map(post => <PostItem key={post.id} post={post} /> )}
      </div>
    </section>
  )
}

export default Posts