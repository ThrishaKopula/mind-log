import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'
import "./signup.css"
import toast from 'react-hot-toast';
const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const {session, signInUser} = UserAuth();
    const navigate = useNavigate();
    // console.log("Session: ", session);

    const handleSignIn = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await signInUser(email, password);
        console.log(result);
        if(result.success){
          navigate('/dashboard');
        } else {
          toast.error("Account not found.", { position: "top-right" });
        }
      } catch (err) {
        setError("an error occured");
        console.log("errorrrr")
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="wrapper">
      <h2>Sign In</h2>
      <form  onSubmit={handleSignIn}>
        <div className="input-box">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" required/>
        </div>
        <div className="input-box">
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create password" required/>
        </div>
        <div className="input-box button">
          <button type="Submit" disabled={loading} value="Register Now">Sign In</button>
        </div>
        <div className="text">
          <h3>Don't have an acount? <Link to='/signup'>Sign Up</Link></h3>
        </div>
        {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
      </form>
    </div>

  )
}

export default Signin