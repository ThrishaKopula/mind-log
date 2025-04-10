import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'
import "./signup.css"
import toast from 'react-hot-toast';
const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const {session, signUpNewUser, signInUser} = UserAuth();
    const navigate = useNavigate();
    // console.log("Session: ", session);

    const handleSignUp = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await signUpNewUser(email, password);
        console.log(result.error);
        if(result.success){

          const signInResult = await signInUser(email, password);
          if (signInResult.error) {
            toast.error("Sign-in failed: " + signInResult.error, { position: "top-right" });
          } else {
              toast.success("Signed In!", { position: "top-right" });
              navigate('/dashboard');
          }


          // await signInUser(email, password);
          // toast.success("Signed In!", {position:"top-right"});
          // navigate('/dashboard');
          // console.log("in heree");
        } else if (result.error==="Unable to validate email address: invalid format"){
          toast.error("Invalid format.", { position: "top-right" });
        }
      } catch (err) {
        setError("an error occured");
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="wrapper">
    <h2>Sign Up</h2>
    <form  onSubmit={handleSignUp}>
      <div className="input-box">
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" required/>
      </div>
      <div className="input-box">
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create password" required/>
      </div>
      <div className="input-box button">
        <button type="Submit" disabled={loading} value="Register Now">Register Now</button>
      </div>
      <div className="text">
        {/* <h3>Already have an account? <a href="#">Sign In</a></h3> */}
        <h3>Don't have an acount? <Link to='/signin'>Sign In</Link></h3>
      </div>
      {error && <h3 className='text-red-600 text-center pt-4'>{error}</h3>}
    </form>
  </div>
  )
}

export default Signup