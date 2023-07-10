import './App.scss';
import Markdown from './components/Markdown/Markdown.component'
import { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => response.json())
      .then(data => {
        setTitle(data[0].title)
        setContent(data[0].content)
        console.log(content)
      })
      .catch(error => console.error(error))
  })
  
  return (
    <>
      <h1 className='markdown__title'>{title}</h1>
      <Markdown content={content} />
    </>
  );
}

export default App;
