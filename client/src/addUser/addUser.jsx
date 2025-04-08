import React, { useState } from 'react'
import "./addUser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserAuth } from '../AuthContext';

const AddUser = () => {
    const {session, signOut} = UserAuth();
    const users = {
        name:"",
        email:"",
        address:"",
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
        .then((response)=>{
            toast.success(response.data.message, {position:"top-right"});
            navigate("/dashboard");
        })
        .catch((error)=>{
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, { position: "top-right" });
            } else {
                toast.error("An unexpected error occurred.", { position: "top-right" });
            }
        })
    }
    const today = new Date().toISOString().split('T')[0];
  return (
    <div className='addUser'>
        <Link to="/dashboard" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i> Back
        </Link>
        <h3>How are you feeling?</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='address'>Date:</label>
                <input
                type="date"
                id="address"
                required="true"
                onChange={inputHandler}
                name="address"
                autoComplete='off'
                placeholder='Date'
                max={today}
                />
            </div>

            <div className='inputGroup'>
                <label htmlFor='name'>Mood:</label>
                <select
                    id="name"
                    required="true"
                    onChange={inputHandler}
                    name="name"
                    value={user.name}
                    >
                    <option value="">Select your mood</option>
                    <option value="Awful">Awful</option>
                    <option value="Sad">Sad</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Happy">Happy</option>
                    <option value="Joyful">Joyful</option>
                </select>

            </div>

            <div className='inputGroup'>
                <label htmlFor='email'>Comments:</label>
                <input
                type="text"
                id="email"
                onChange={inputHandler}
                name="email"
                autoComplete='off'
                placeholder='Anything extra?'
                />
            </div>

            

            <div className='inputGroup'>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser