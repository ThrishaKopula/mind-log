import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'
const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const {session, signUpNewUser} = UserAuth();
    const navigate = useNavigate();
    // console.log("Session: ", session);

    const handleSignUp = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await signUpNewUser(email, password);
        if(result.success){
          navigate('/dashboard');
        }
      } catch (err) {
        setError("an error occured");
      } finally {
        setLoading(false);
      }
    }
  return (
    <div>
        <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
            <h2 className='font-bold pb-2'>SignUp</h2>
            <p>Already have an acount? <Link to='/signin'>Sign In</Link></p>
            <div className='flex flex-col py-4'>
                <input onChange={(e) => setEmail(e.target.value)} placeholder='email' className='p-3 mt-4' type="email"/>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='password' className='p-3 mt-4' type="password"/>
                <button type='submit' disabled={loading} className='mt-6 w-full'>Sign Up</button>
                {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
            </div>
        </form>
    </div>
  )
}

export default Signup