import React from 'react'
import './NotFound.style.scss'

const NotFound = ({ title }) => {
  return (
    <div className='container'>
        <h1>{title} not found.</h1>
        <h2>Error 404</h2>
    </div>
  )
}

export default NotFound