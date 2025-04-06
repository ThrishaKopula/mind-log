import React, { useEffect, useState } from 'react'
import "./user.css"
import Title from '../titlePage/Title';
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([])
    useEffect(()=> {
        const fetchData = async()=>{
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async(userId)=>{
        await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
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

  return (
        <div className='userTable'>
        <Link to="/add" type="button" class="btn btn-primary">
            <i class="fa-solid fa-circle-plus"></i> Add Mood   
        </Link>

        {users.length === 0?(
            <div className='noData'>
                <h3>No Data to display</h3>
                <p>please add new user</p>
            </div>
        ):(
            <table className='table table-bordered'>
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
                        <td>{formatDateForInput(user.address)}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="actionButtons">
                            <Link to={`/update/`+user._id} type="button" class="btn btn-info">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button 
                            onClick={()=>deleteUser(user._id)}
                            type="button" class="btn btn-danger">
                                <i class="fa-solid fa-trash"></i>
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