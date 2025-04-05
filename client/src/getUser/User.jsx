import React from 'react'
import "./user.css"

const User = () => {
  return (
    <div className='userTable'>
        <button type="button" class="btn btn-primary">Add User</button>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope="col">S. No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>john@gmail.com</td>
                    <td>US</td>
                    <td>Update | Delete</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default User