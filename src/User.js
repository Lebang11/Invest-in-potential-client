
import {useEffect, useState} from 'react';
import axios from 'axios';
import UserRow from './userRow';

const Users = () => {
    // learn useState
    const [users, setUsers] = useState([]);
    const [addedPoints, setPoints] = useState(0);


    // Trying to get users from database, refer to server side
  const getUsers = async () => {
    // learn about promises and async await
    // fetches from our backend as a list of all user jsons
    const users = await fetch('https://investing-in-potential.onrender.com')
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
            <UserRow getUsers={getUsers} user={user} count={count}/>
     );
    })
    )
    
    
}
 
export default Users;