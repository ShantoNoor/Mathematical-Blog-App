import React, { useState } from 'react'
import './PostsAdd.style.scss'
import { useNavigate } from 'react-router-dom';

const PostsAdd = () => {
  const [files, setFiles] = useState(null)
  const navigate = useNavigate();

  const handelFiles = event => {
    setFiles(event.target.files)
  }

  const addPost = (event) => {
    event.preventDefault()
    console.log(event.target.title.value)
    console.log(event.target.content.value)
    console.log(files)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MjYwNDQ3LCJqdGkiOiIzOTkxZDA0NTIxOTM0Yjk3YmMzMzk1YTdmMGQzYTNmNiIsInVzZXJfaWQiOjN9.oftFb5sGILvz3NpVBN7fpLFHAhLVvfxmjxupt6IwaIM");

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

    fetch("http://127.0.0.1:8000/api/posts/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => {
        console.log('error', error)
      });
    
    navigate("/posts")
  }

  return (
    <>
      <section className='post-add'>
        <h1 className='post-add__title'>Add Post</h1>
        <form className='post-form' onSubmit={addPost}>
          <input className='post-form__title' type='text' name='title' placeholder='Post Title' />
          <textarea className='post-form__content' name='content' placeholder='Post Content' />
          <input type='file' multiple name='uploaded_images' onChange={handelFiles} />
          <input className='post-form__btn' type='submit' value='Add' />
        </form>
      </section>
    </>
  )
}

export default PostsAdd