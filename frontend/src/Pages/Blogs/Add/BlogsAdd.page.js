import React, { useState } from 'react'
import './BlogsAdd.style.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar.component'

const BlogsAdd = () => {
  const [files, setFiles] = useState(null)
  const navigate = useNavigate();

  const handelFiles = event => {
    setFiles(event.target.files)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${localStorage.getItem('access_token')}`);

    const formdata = new FormData();
    formdata.append("title", event.target.title.value);
    formdata.append("content", event.target.content.value);
    formdata.append("blog_status", event.target.blog_status.value);

    if(files !== null) {
      Array.from(files).forEach(file => {
        formdata.append("uploaded_images", file);
      });
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/api/blogs/", requestOptions)
      .then(response => response.text())
      .then(result => {
        // console.log(result)
        navigate('/blogs/me', { replace: true })
      })
      .catch(error => {
        console.log('error', error)
        navigate('/*', { replace: true })
      });
  }

  return (
    <>
      <Navbar />
      <section className='blog-add'>
        <h1 className='blog-add__title'>Add Blog</h1>
        <form className='blog-form' onSubmit={addBlog}>
          <input className='blog-form__title' type='text' name='title' placeholder='Blog Title' />
          <textarea className='blog-form__content' name='content' placeholder='Blog Content' />
          <input type='file' multiple name='uploaded_images' onChange={handelFiles} />
          <select className="blog-form__control" name="blog_status">
            <option value="Pending">Pending</option>
            <option value="Published">Published</option>
          </select>
          <input className='blog-form__btn' type='submit' value='Add' />
        </form>
      </section>
    </>
  )
}

export default BlogsAdd