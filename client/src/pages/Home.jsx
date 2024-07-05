import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div>Home</div>
        <Link
            to="/signup"
            className="text-blue-500"
        >Sign Up</Link>
    </div>
  )
}

export default Home