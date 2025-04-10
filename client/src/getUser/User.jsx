import React, { useEffect, useState } from 'react'
import "./user.css"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserAuth } from '../AuthContext';

const User = () => {
    const {session, signOut} = UserAuth();
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchData = async()=>{
            try {
                const email = session?.user?.email;
                if (email) {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
                        params: { email },
                    });
                setUsers(response.data);
                }
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async(userId)=>{
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/delete/user/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId));
            toast.success(response.data.message, {position:"top-right"})
            
        })
        .catch((error)=> {
            console.log(error);
        });
    }
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
      };
    const sortedUsers = [...users].sort((a, b) => new Date(a.address) - new Date(b.address));

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
  return (
        <div className='userTable'>
            <div className='header'>
            <h2>Welcome, {session?.user?.email}</h2>
            <p onClick={handleSignOut} className='btn btn-secondary signOutBtn'>
                Sign out <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </p>
            </div>
        
        <Link to="/add" type="button" class="btn btn-primary">
            <i class="fa-solid fa-circle-plus"></i> Add Mood   
        </Link>
        

        {users.length === 0?(
            <div className='noData'>
                <h3>No Data to display</h3>
                <p>Please add new entry</p>
            </div>
        ):(
            <table className='table table-light table-hover'>
            <thead>
                <tr>
                    {/* <th scope="col">Index</th> */}
                    <th scope="col">Date</th>
                    <th scope="col">Mood</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map((user, index)=>{           
                   return (
                    <tr>
                        <td>{formatDateForInput(user.date)}</td>
                        <td>{user.mood}</td>
                        <td className="commentsCell">{user.comments}</td>
                        <td className="actionButtons">
                            <Link to={`/update/`+user._id} type="button" class="btn btn-primary">
                                <i class="fa-solid fa-pen-to-square"></i> Update
                            </Link>
                            <button 
                            onClick={()=>deleteUser(user._id)}
                            type="button" class="btn btn-danger">
                                <i class="fa-solid fa-trash"></i> Delete
                            </button>
                            
                        </td>
                    </tr>
                   );  
                })}
            </tbody>
        </table>
        )}
    </div>
  )
}

export default User