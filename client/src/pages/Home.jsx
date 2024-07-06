import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col'>
        <div>Home</div>
        <Link
            to="/signup"
            className="text-blue-500"
        >Sign Up</Link>

        <Link
            to="/my-profile"
            className="text-blue-500"
        >Profile</Link>
    </div>
  )
}

export default Home