import React, { useEffect, useState } from 'react'
import "./update.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const users = {
        mood:"",
        comments:"",
        date:"",
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const {id} = useParams();

    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`)
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/update/user/${id}`, user)
        .then((response)=>{
            toast.success(response.data.message, {position:"top-right"});
            navigate("/dashboard");
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
      };
  return (
    <div className='addUser'>
        <Link to="/dashboard" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i> Back
        </Link>
        <h3>Update Mood</h3>
        <form className='addUserForm' onSubmit={submitForm}>

            <div className='inputGroup'>
                <label htmlFor='date'>Date:</label>
                <input
                type="date"
                id="date"
                required="true"
                value={formatDateForInput(user.date)}
                onChange={inputHandler}
                name="date"
                autoComplete='off'
                placeholder='Date'
                />
            </div>

            <div className='inputGroup'>
                <label htmlFor='mood'>Mood:</label>
                <select
                className='dropdown'
                id="mood"
                required
                onChange={inputHandler}
                name="mood"
                value={user.mood}
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
                <label htmlFor='comments'>Comments:</label>
                <input
                type="text"
                id="comments"
                value={user.comments}
                onChange={inputHandler}
                name="comments"
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

export default UpdateUser