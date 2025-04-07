import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from './AuthContext'
const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const {session} = UserAuth();
    console.log(session);
  return (
    <div>
        <form className='max-w-md m-auto pt-24'>
            <h2 className='font-bold pb-2'>SignUp</h2>
            <p>Already have an acount? <Link to='/signin'>Sign In</Link></p>
            <div className='flex flex-col py-4'>
                <input placeholder='email' className='p-3 mt-4' type="email"/>
                <input placeholder='password' className='p-3 mt-4' type="password"/>
                <button type='submit' disabled={loading} className='mt-6 w-full'>Sign Up</button>
            </div>
        </form>
    </div>
  )
}

export default Signup