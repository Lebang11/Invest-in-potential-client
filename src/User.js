

import {useEffect, useState} from 'react';

const Users = () => {
    // learn useState
    const [users, setUsers] = useState([]);

    // Trying to get users from database, refer to server side
  const getUsers = async () => {
    // learn about promises and async await
    // fetches from our backend as a list of all user jsons
    const users = await fetch('http://localhost:3000')
                  .then(res => res.json())
                  .then(res => setUsers(res))
                  .catch(err=>console.log(err))

    // next I'm adding a react component that uses each user to add on the list
}   

    useEffect(() => {
        getUsers()   
    },[])

    // creating map to map through and add more users

    // learn useEffect
   
    let count = 0;
    return (
        users.map((user) => {
        count +=1;
        return ( 
            <tr>
                <th scope='row'>{count}</th>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.phonenumber}</td>
                <td>{user.points}</td>
              </tr>
        
     );
    })
    )
    
    
}
 
export default Users;