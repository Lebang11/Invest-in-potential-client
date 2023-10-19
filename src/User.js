
import {useEffect, useState} from 'react';
import axios from 'axios';

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

    const editPoints = (id, points) => {
        axios.post('https://investing-in-potential.onrender.com/points',
        {   
            id, 
            points
        }
        )
        .then(res => alert(`${addedPoints} added/removed`))
        .then(res => {
            setPoints(0);
            getUsers()})
        .catch(err=>console.log(err))
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
                <td>{Number(user.points) }<span>
                    {/* <button onClick={()=>user.points+=1} className='btn btn-info btn-sm rounded-circle ms-3'><i class="bi bi-plus-lg"></i></button>
                    <button onClick={()=>setPoints(addedPoints-1)} className='btn btn-danger btn-sm rounded-circle ms-1'><i class="bi bi-dash"></i></button> */}
                    </span>
                </td>
                    
                    
                    {(addedPoints>0 || addedPoints<0) && 
                    <button onClick={()=>editPoints(user._id, Number(user.points) + addedPoints)} className="btn btn-sm btn-success mx-2">
                        <i class="bi bi-check2"></i>

                    </button>
                    }  
                    
              </tr>
              
        
     );
    })
    )
    
    
}
 
export default Users;