// import React from 'react'
import Home from "../home.jsx"
import './notfound.css'


export default function Notfound() {
  return (
    <div>
      <p> not FOund</p>
      <a href={<Home/>}>click here to go to home page.</a>
    </div>
  )
}
