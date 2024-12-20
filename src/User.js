import {useEffect, useState} from 'react';
import { api, endpoints } from './config/api';
import UserRow from './userRow';

const Users = () => {
    // learn useState
    const [users, setUsers] = useState([]);
    const [addedPoints, setPoints] = useState(0);
    const [isLoading, setLoading] = useState(true)


    // Trying to get users from database, refer to server side
  const getUsers = async () => {
    try {
        const response = await api.get(endpoints.users);
        setUsers(response.data);
        setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
    }
  }   

    

    useEffect(() => {
        getUsers()   
    },[])

    // creating map to map through and add more users

    // learn useEffect
   
    let count = 0;
    return (
        <tbody>
            {isLoading && 
                    <tbody>
                        <h1 class="lead text-center" type="button" disabled>
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      Loading... Might take a while...
                      </h1>
                    </tbody>
                      
                      }
            {users.map((user) => {
        count +=1;
        
        return ( 
            <UserRow getUsers={getUsers} user={user} count={count}/>
        );
        })}
        </tbody>
        
    )
    
    
}
 
export default Users;