import React from 'react';
import { useUsers } from '../Context/UsersContext';


function Users() {

    const users  = useUsers();
    const rows = users.map((user) =>
            <tr key={user.id}>
                <td>
                    {user.id}
                </td>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.password}
                </td>
            </tr>
    );

    return (
        
        <table className="table table-bordered">
        <thead>
        <tr className="table-primary"> 
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
        </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
        </table>  
        
    )
}

export default Users;