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
    console.log(event.target.title.value)
    console.log(event.target.content.value)
    console.log(files)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${localStorage.getItem('access_token')}`);

    const formdata = new FormData();
    formdata.append("title", event.target.title.value);
    formdata.append("content", event.target.content.value);

    if(files !== null) {
      Array.from(files).forEach(file => {
        formdata.append("uploaded_images", file);
      });
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/blogs/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => {
        console.log('error', error)
        navigate('/*', { replace: true })
      });
    
      window.location.replace("/blogs")
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
          <input className='blog-form__btn' type='submit' value='Add' />
        </form>
      </section>
    </>
  )
}

export default BlogsAdd