import { useEffect, useState } from 'react';
import Markdown from '../../../components/Markdown/Markdown.component'
import { useParams } from 'react-router-dom';
import NotFound from '../../NotFound/NotFound.page';
import './PostsDetail.style.scss'

const PostsDetail = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/' + id)
      .then(response => {
				if(response.statusText === 'OK')
					return response.json()
				return ''
			})
      .then(data => {
				if(data !== '') {
					setTitle(data.title)
					setContent(data.content)
				}
      })
      .catch(error => console.error(error))
  })

  return (content !== '') ?
    (<section className='post-details'>
      <h1 className='post-details__title'>{title}</h1>
      <Markdown content={content} />
    </section>)
	:
	<NotFound title='Post' />
}

export default PostsDetail